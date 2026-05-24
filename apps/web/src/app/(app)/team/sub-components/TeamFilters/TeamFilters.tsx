"use client";

import { SearchField, Select, SelectItem } from "@jigsaw/design-system";
import { DEPARTMENT_FILTER_OPTIONS, ROLE_FILTER_OPTIONS } from "../../team.constants";

type TeamFiltersProps = {
  query: string;
  roleFilter: string;
  deptFilter: string;
  onQueryChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onDeptFilterChange: (value: string) => void;
};

export function TeamFilters({
  query,
  roleFilter,
  deptFilter,
  onQueryChange,
  onRoleFilterChange,
  onDeptFilterChange,
}: TeamFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="flex-1 min-w-48">
        <SearchField label="Search" placeholder="Search by name or email…" value={query} onChange={onQueryChange} />
      </div>
      <div className="w-36">
        <Select label="Role" value={roleFilter} onChange={(key) => onRoleFilterChange(key as string)}>
          {ROLE_FILTER_OPTIONS.map(({ id, label }) => (
            <SelectItem key={id} id={id}>
              {label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-44">
        <Select label="Department" value={deptFilter} onChange={(key) => onDeptFilterChange(key as string)}>
          {DEPARTMENT_FILTER_OPTIONS.map(({ id, label }) => (
            <SelectItem key={id} id={id}>
              {label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
