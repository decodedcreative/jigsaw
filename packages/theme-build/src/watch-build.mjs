import { spawn } from "node:child_process";
import { watch } from "node:fs";

/** @param {string | null | undefined} filename */
export const isJsonChange = (filename) =>
  filename == null || filename.endsWith(".json");

/**
 * @param {string} scriptPath
 * @param {string} cwd
 * @returns {Promise<void>}
 */
export const spawnNodeScript = (scriptPath, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], { cwd, stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${scriptPath} exited with ${code ?? signal}`));
    });
  });

/**
 * Watch token JSON and rebuild. Rapid saves collapse into one run, and a save
 * during a build queues a single follow-up run.
 *
 * @param {{
 *   dirs: string[],
 *   run: () => Promise<void>,
 *   label: string,
 *   debounceMs?: number,
 *   isSourceFile?: (filename: string | null) => boolean,
 *   log?: (message: string) => void,
 *   error?: (message: unknown) => void,
 * }} options
 */
export const watchBuild = ({
  dirs,
  run,
  label,
  debounceMs = 150,
  isSourceFile = isJsonChange,
  log = console.log,
  error = console.error,
}) => {
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  let running = false;
  let queued = false;
  let stopped = false;

  const rebuild = () => {
    if (stopped) return Promise.resolve();
    if (running) {
      queued = true;
      return Promise.resolve();
    }

    running = true;
    const started = Date.now();
    return Promise.resolve()
      .then(run)
      .then(() => {
        log(`[${label}] rebuilt in ${Date.now() - started}ms`);
      })
      .catch((rebuildError) => {
        error(`[${label}] rebuild failed`);
        error(rebuildError);
      })
      .finally(() => {
        running = false;
        if (queued && !stopped) {
          queued = false;
          return rebuild();
        }
      });
  };

  /** @param {string | null} filename */
  const schedule = (filename) => {
    if (stopped || !isSourceFile(filename)) return;
    log(`[${label}] ${filename ?? "sources"} changed`);
    clearTimeout(timer);
    timer = setTimeout(() => {
      void rebuild();
    }, debounceMs);
  };

  const watchers = dirs.map((dir) =>
    watch(dir, { recursive: true }, (_event, filename) => {
      const name = filename == null ? null : filename.toString();
      schedule(name);
    }),
  );

  const stop = () => {
    stopped = true;
    clearTimeout(timer);
    for (const watcher of watchers) watcher.close();
  };

  return { rebuild, schedule, stop };
};

/**
 * Rebuild once, then again whenever JSON under `dirs` changes.
 * Stays running until the process is signalled.
 *
 * @param {{
 *   dirs: string[],
 *   scriptPath: string,
 *   cwd: string,
 *   label: string,
 * }} options
 */
export const watchNodeScript = ({ dirs, scriptPath, cwd, label }) => {
  const { rebuild, stop } = watchBuild({
    dirs,
    label,
    run: () => spawnNodeScript(scriptPath, cwd),
  });

  const shutdown = () => {
    stop();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  return rebuild();
};
