import { render, screen } from "@testing-library/react";
import { SkillsDataTable } from "@/components/skills-data-table";
import { Skill } from "@/lib/skills";

/* eslint-disable react/display-name, @typescript-eslint/no-unused-vars */

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href, target }: Record<string, unknown>) => (
    <a href={href} target={target}>
      {children}
    </a>
  );
});

// Mock lucide icons
jest.mock("lucide-react", () => ({
  ArrowUpDown: () => <div data-testid="arrow-up-down" />,
  ChevronDown: () => <div data-testid="chevron-down" />,
  ExternalLink: () => <div data-testid="external-link" />,
  MoreHorizontal: () => <div data-testid="more-horizontal" />,
}));

// Mock UI components
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, className, onClick, disabled }: Record<string, unknown>) => (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: Record<string, unknown>) => <div>{children}</div>,
  DropdownMenuCheckboxItem: ({ children, checked, onCheckedChange }: Record<string, unknown>) => (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      {children}
    </label>
  ),
  DropdownMenuContent: ({ children }: Record<string, unknown>) => <div>{children}</div>,
  DropdownMenuItem: ({ children, asChild }: Record<string, unknown>) =>
    asChild ? children : <div>{children}</div>,
  DropdownMenuLabel: ({ children, className }: Record<string, unknown>) => (
    <div className={className}>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
  DropdownMenuTrigger: ({ children, asChild }: Record<string, unknown>) =>
    asChild ? children : <div>{children}</div>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: ({ placeholder, value, onChange, className }: Record<string, unknown>) => (
    <input placeholder={placeholder} value={value} onChange={onChange} className={className} />
  ),
}));

jest.mock("@/components/ui/table", () => ({
  Table: ({ children, className }: Record<string, unknown>) => (
    <table className={className}>{children}</table>
  ),
  TableBody: ({ children }: Record<string, unknown>) => <tbody>{children}</tbody>,
  TableCell: ({ children, colSpan, className }: Record<string, unknown>) => (
    <td colSpan={colSpan} className={className}>
      {children}
    </td>
  ),
  TableHead: ({ children, className }: Record<string, unknown>) => (
    <th className={className}>{children}</th>
  ),
  TableHeader: ({ children }: Record<string, unknown>) => <thead>{children}</thead>,
  TableRow: ({ children, className }: Record<string, unknown>) => (
    <tr className={className}>{children}</tr>
  ),
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children, variant }: Record<string, unknown>) => (
    <span data-variant={variant}>{children}</span>
  ),
}));

// Mock TanStack Table
jest.mock("@tanstack/react-table", () => ({
  useReactTable: jest.fn(() => ({
    getHeaderGroups: () => [
      {
        id: "header",
        headers: [
          {
            id: "name",
            isPlaceholder: false,
            getContext: () => ({}),
            column: { columnDef: { header: "Skill" } },
          },
          {
            id: "projects",
            isPlaceholder: false,
            getContext: () => ({}),
            column: { columnDef: { header: "Projects" } },
          },
          {
            id: "actions",
            isPlaceholder: false,
            getContext: () => ({}),
            column: { columnDef: { header: null } },
          },
        ],
      },
    ],
    getRowModel: () => ({
      rows: [
        {
          id: "row1",
          getVisibleCells: () => [
            { id: "cell1", getContext: () => ({}), column: { columnDef: { cell: "React" } } },
            {
              id: "cell2",
              getContext: () => ({}),
              column: { columnDef: { cell: <span>2 projects</span> } },
            },
            {
              id: "cell3",
              getContext: () => ({}),
              column: { columnDef: { cell: <button>Actions</button> } },
            },
          ],
        },
      ],
    }),
    getColumn: (id: string) => ({
      getFilterValue: () => "",
      setFilterValue: jest.fn(),
    }),
    getAllColumns: () => [],
    getState: () => ({ pagination: { pageIndex: 0 } }),
    getPageCount: () => 1,
    getFilteredRowModel: () => ({ rows: [] }),
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    getCanPreviousPage: () => false,
    getCanNextPage: () => false,
  })),
  getCoreRowModel: jest.fn(),
  getPaginationRowModel: jest.fn(),
  getSortedRowModel: jest.fn(),
  getFilteredRowModel: jest.fn(),
  flexRender: jest.fn((component, props) => {
    if (typeof component === "function") {
      return component(props);
    }
    return component;
  }),
}));

const mockSkills: Skill[] = [
  {
    name: "React",
    projects: [
      {
        slug: "proj1",
        title: "Project 1",
        shortDescription: "",
        description: "",
        technologies: [],
        images: [],
      },
      {
        slug: "proj2",
        title: "Project 2",
        shortDescription: "",
        description: "",
        technologies: [],
        images: [],
      },
    ],
  },
];

describe("SkillsDataTable", () => {
  it("renders the table with skills data", () => {
    render(<SkillsDataTable data={mockSkills} />);
    expect(screen.getByText("Skill")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<SkillsDataTable data={mockSkills} />);
    expect(screen.getByPlaceholderText("Search skills...")).toBeInTheDocument();
  });

  it("renders columns dropdown", () => {
    render(<SkillsDataTable data={mockSkills} />);
    expect(screen.getByText("Columns")).toBeInTheDocument();
  });

  it("renders pagination controls", () => {
    render(<SkillsDataTable data={mockSkills} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
