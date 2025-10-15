'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
} from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import * as React from 'react';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { format, formatDistance } from 'date-fns';

export const connectionsDataSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'approved', 'declined', 'completed']),
  createdAt: z.string(),
  guests: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  fromUser: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
  }),
  author: z.object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
  }),
  property: z.object({
    id: z.string(),
    type: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipcode: z.string(),
  }),
});

type ConnectionsDataInferred = z.infer<typeof connectionsDataSchema>;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant='ghost'
      size='icon'
      className='text-muted-foreground size-7 hover:bg-transparent'>
      <IconGripVertical className='text-muted-foreground size-3' />
      <span className='sr-only'>Drag to reorder</span>
    </Button>
  );
}

const columns: ColumnDef<ConnectionsDataInferred>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Swap ID',
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />;
      // return toast.info('Not Implement TableCellViewer component');
      // return <Badge variant={'outline'}>{row.original.id}</Badge>;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {row.original.status === 'approved' ? (
          <IconCircleCheckFilled className='fill-green-500 dark:fill-green-400' />
        ) : (
          <IconLoader className={'animate-spin'} />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'propertyDetails',
    header: 'Property Details',
    cell: ({ row }) => (
      <div className='text-muted-foreground px-1.5 text-wrap'>
        <Badge className={'block'}>{row.original.property.type}</Badge>
        <span className={'block text-xs'}>
          Addr: {row.original.property.address}
        </span>
        <span className={'block text-xs'}>
          City: {row.original.property.city}
        </span>
        <span className={'block text-xs'}>
          State: {row.original.property.state}
        </span>
        <span className={'block text-xs'}>
          Country: {row.original.property.country}
        </span>
        <span className={'block text-xs'}>
          Zip: {row.original.property.zipcode}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => (
      <div className='text-muted-foreground px-1.5 text-wrap'>
        <span> {row.original.fromUser.fullName}</span>,{' '}
        <span className={'font-medium'}>{row.original.fromUser.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'author',
    header: 'Author',
    cell: ({ row }) => (
      <div className='text-muted-foreground px-1.5 text-wrap'>
        <span>{row.original.author.fullName}</span>,{' '}
        <span className={'font-medium'}>{row.original.author.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'guests',
    header: 'Guests',
    cell: ({ row }) => (
      // <div className='w-32'>
      <Badge variant='secondary' className='text-muted-foreground px-1.5'>
        Guests {row.original.guests}
      </Badge>
      // </div>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {format(new Date(row.original.startDate), 'MMM dd, yyyy')}
      </Badge>
    ),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {format(new Date(row.original.endDate), 'MMM dd, yyyy')}
      </Badge>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <Badge variant='outline' className='text-muted-foreground px-1.5'>
        {formatDistance(new Date(row.original.createdAt), new Date(), {
          addSuffix: true,
        })}
      </Badge>
    ),
  },
  // {
  //   accessorKey: 'target',
  //   header: () => <div className='w-full text-right'>Target</div>,
  //   cell: ({ row }) => (
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
  //           loading: `Saving ${row.original.header}`,
  //           success: 'Done',
  //           error: 'Error',
  //         });
  //       }}>
  //       <Label htmlFor={`${row.original.id}-target`} className='sr-only'>
  //         Target
  //       </Label>
  //       <Input
  //         className='hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent'
  //         defaultValue={row.original.target}
  //         id={`${row.original.id}-target`}
  //       />
  //     </form>
  //   ),
  // },
  // {
  //   accessorKey: 'limit',
  //   header: () => <div className='w-full text-right'>Limit</div>,
  //   cell: ({ row }) => (
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault();
  //         toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
  //           loading: `Saving ${row.original.header}`,
  //           success: 'Done',
  //           error: 'Error',
  //         });
  //       }}>
  //       <Label htmlFor={`${row.original.id}-limit`} className='sr-only'>
  //         Limit
  //       </Label>
  //       <Input
  //         className='hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent'
  //         defaultValue={row.original.limit}
  //         id={`${row.original.id}-limit`}
  //       />
  //     </form>
  //   ),
  // },
  // {
  //   accessorKey: 'reviewer',
  //   header: 'Reviewer',
  //   cell: ({ row }) => {
  //     const isAssigned = row.original.reviewer !== 'Assign reviewer';

  //     if (isAssigned) {
  //       return row.original.reviewer;
  //     }

  //     return (
  //       <>
  //         <Label htmlFor={`${row.original.id}-reviewer`} className='sr-only'>
  //           Reviewer
  //         </Label>
  //         <Select>
  //           <SelectTrigger
  //             className='w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate'
  //             size='sm'
  //             id={`${row.original.id}-reviewer`}>
  //             <SelectValue placeholder='Assign reviewer' />
  //           </SelectTrigger>
  //           <SelectContent align='end'>
  //             <SelectItem value='Eddie Lake'>Eddie Lake</SelectItem>
  //             <SelectItem value='Jamik Tashpulatov'>
  //               Jamik Tashpulatov
  //             </SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </>
  //     );
  //   },
  // },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
            size='icon'>
            <IconDotsVertical />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<ConnectionsDataInferred> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function ConnectionsTable({
  data: initialData,
}: {
  data: ConnectionsDataInferred[];
}) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  return (
    <Tabs
      defaultValue='outline'
      className='w-full flex-col justify-start gap-6'>
      <div className='flex items-center justify-between px-4 lg:px-6'>
        <Label htmlFor='view-selector' className='sr-only'>
          View
        </Label>
        <Select defaultValue='outline'>
          <SelectTrigger
            className='flex w-fit @4xl/main:hidden'
            size='sm'
            id='view-selector'>
            <SelectValue placeholder='Select a view' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='outline'>Outline</SelectItem>
            <SelectItem value='past-performance'>Past Performance</SelectItem>
            <SelectItem value='key-personnel'>Key Personnel</SelectItem>
            <SelectItem value='focus-documents'>Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className='**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex'>
          <TabsTrigger value='outline'>Outline</TabsTrigger>
          <TabsTrigger value='past-performance'>
            Past Performance <Badge variant='secondary'>3</Badge>
          </TabsTrigger>
          <TabsTrigger value='key-personnel'>
            Key Personnel <Badge variant='secondary'>2</Badge>
          </TabsTrigger>
          <TabsTrigger value='focus-documents'>Focus Documents</TabsTrigger>
        </TabsList>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm'>
                <IconLayoutColumns />
                <span className='hidden lg:inline'>Customize Columns</span>
                <span className='lg:hidden'>Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== 'undefined' &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className='capitalize'
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='outline' size='sm'>
            <IconPlus />
            <span className='hidden lg:inline'>Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value='outline'
        className='relative flex flex-col gap-4 overflow-auto px-4 lg:px-6'>
        <div className='overflow-hidden rounded-lg border'>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}>
            <Table>
              <TableHeader className='bg-muted sticky top-0 z-10'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className='**:data-[slot=table-cell]:first:w-8'>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className='flex items-center justify-between px-4'>
          <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className='flex w-full items-center gap-8 lg:w-fit'>
            <div className='hidden items-center gap-2 lg:flex'>
              <Label htmlFor='rows-per-page' className='text-sm font-medium'>
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}>
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='flex w-fit items-center justify-center text-sm font-medium'>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </div>
            <div className='ml-auto flex items-center gap-2 lg:ml-0'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className='sr-only'>Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant='outline'
                className='size-8'
                size='icon'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant='outline'
                className='hidden size-8 lg:flex'
                size='icon'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className='sr-only'>Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value='past-performance'
        className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
      <TabsContent value='key-personnel' className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
      <TabsContent
        value='focus-documents'
        className='flex flex-col px-4 lg:px-6'>
        <div className='aspect-video w-full flex-1 rounded-lg border border-dashed'></div>
      </TabsContent>
    </Tabs>
  );
}

function TableCellViewer({ item }: { item: ConnectionsDataInferred }) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant='link'
          className='text-foreground w-fit px-0 text-xs text-left'>
          {item.id}
        </Button>
      </DrawerTrigger>

      <DrawerContent className={'space-y-4'}>
        <DrawerHeader className='gap-1'>
          <DrawerTitle>Swap Details</DrawerTitle>

          <DrawerDescription className={'text-xs text-muted-foreground'}>
            Details of connection request ID: {item.id}
          </DrawerDescription>
        </DrawerHeader>
        <Separator />

        {/* <div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Badge>User 1</Badge>
              <span className='font-medium'>{item.user1.fullName}</span>
              <span className='text-xs text-muted-foreground'>
                {item.user1.email}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Badge>User 2</Badge>
              <span className='font-medium'>{item.user2.fullName}</span>
              <span className='text-xs text-muted-foreground'>
                {item.user2.email}
              </span>
            </div>
          </div>
          <Separator />
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Badge>Property 1</Badge>
              <span className='font-medium'>{item.property1.address}</span>
              <span className='text-xs text-muted-foreground'>
                {item.property1.city}, {item.property1.state}{' '}
                {item.property1.zipcode}, {item.property1.country}
              </span>
              <span className='text-xs text-muted-foreground'>
                Owner: {item.property1.ownerName} ({item.property1.ownerEmail})
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <Badge>Property 2</Badge>
              <span className='font-medium'>{item.property2.address}</span>
              <span className='text-xs text-muted-foreground'>
                {item.property2.city}, {item.property2.state}{' '}
                {item.property2.zipcode}, {item.property2.country}
              </span>
              <span className='text-xs text-muted-foreground'>
                Owner: {item.property2?.ownerName || 'N/A'} (
                {item.property2?.ownerEmail || 'N/A'})
              </span>
            </div>
          </div>
          <Separator />
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Badge>Match Created At</Badge>
              <span className='font-medium'>
                {formatDistance(new Date(item.match.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <Separator />
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <Badge>Swap Status</Badge>
              <span className='font-medium'>{item.status}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <Badge>Swap Requsted on</Badge>
              <span className='font-medium text-xs'>
                {formatDistance(new Date(item.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
          <Separator />
        </div> */}

        <DrawerFooter>
          <Separator />
          <Button>Accept</Button>
          <Button variant={'destructive'}>Reject</Button>

          <DrawerClose asChild>
            <Button variant='outline'>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
