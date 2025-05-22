/** @format */

import { useState, useMemo } from "react";
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface Column<T> {
     header: string;
     accessorKey: string;
     cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
     data: T[];
     columns: Column<T>[];
     onRowClick?: (item: T) => void;
     searchable?: boolean;
     pagination?: boolean;
     itemsPerPageOptions?: number[];
}

export function DataTable<T extends { id: string }>({
     data,
     columns,
     onRowClick,
     searchable = true,
     pagination = true,
     itemsPerPageOptions = [10, 20, 50, 100],
}: DataTableProps<T>) {
     const [searchQuery, setSearchQuery] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
     const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

     const filteredData = useMemo(() => {
          if (!searchable || !Array.isArray(data)) return data;

          const query = searchQuery.toLowerCase();
          return data.filter((item) =>
               Object.values(item).some(
                    (value) =>
                         typeof value === "string" &&
                         value.toLowerCase().includes(query),
               ),
          );
     }, [data, searchQuery, searchable]);

     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

     const paginatedData = useMemo(() => {
          if (!pagination) return filteredData;
          const start = (currentPage - 1) * itemsPerPage;
          return filteredData.slice(start, start + itemsPerPage);
     }, [filteredData, currentPage, itemsPerPage, pagination]);

     return (
          <div className='w-full'>
               {searchable && (
                    <div className='flex items-center mb-4'>
                         <div className='relative flex-1 max-w-sm'>
                              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                              <Input
                                   type='search'
                                   placeholder='Search...'
                                   className='w-full pl-8'
                                   value={searchQuery}
                                   onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                   }}
                              />
                         </div>
                    </div>
               )}

               <div className='rounded-md border'>
                    <Table>
                         <TableHeader>
                              <TableRow>
                                   {columns.map((col) => (
                                        <TableHead key={col.accessorKey}>
                                             {col.header}
                                        </TableHead>
                                   ))}
                              </TableRow>
                         </TableHeader>

                         <TableBody>
                              {paginatedData.length ? (
                                   paginatedData.map((item) => (
                                        <TableRow
                                             key={item.id}
                                             onClick={() => onRowClick?.(item)}
                                             className={
                                                  onRowClick
                                                       ? "cursor-pointer hover:bg-muted/50"
                                                       : ""
                                             }>
                                             {columns.map((col) => (
                                                  <TableCell
                                                       key={`${item.id}-${col.accessorKey}`}>
                                                       {col.cell
                                                            ? col.cell(item)
                                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                            : (item as any)[
                                                                   col
                                                                        .accessorKey
                                                              ]}
                                                  </TableCell>
                                             ))}
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell
                                             colSpan={columns.length}
                                             className='h-24 text-center'>
                                             No results found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>

               {pagination && totalPages > 1 && (
                    <div className='flex items-center justify-between mt-4'>
                         <div className='flex items-center gap-2'>
                              <p className='text-sm text-muted-foreground'>
                                   Showing
                              </p>
                              <Select
                                   value={String(itemsPerPage)}
                                   onValueChange={(value) => {
                                        setItemsPerPage(Number(value));
                                        setCurrentPage(1);
                                   }}>
                                   <SelectTrigger className='h-8 w-[70px]'>
                                        <SelectValue />
                                   </SelectTrigger>
                                   <SelectContent>
                                        {itemsPerPageOptions.map((option) => (
                                             <SelectItem
                                                  key={option}
                                                  value={String(option)}>
                                                  {option}
                                             </SelectItem>
                                        ))}
                                   </SelectContent>
                              </Select>
                              <p className='text-sm text-muted-foreground'>
                                   of {filteredData.length} items
                              </p>
                         </div>

                         <div className='flex items-center gap-2'>
                              <Button
                                   variant='outline'
                                   size='icon'
                                   onClick={() =>
                                        setCurrentPage((p) =>
                                             Math.max(p - 1, 1),
                                        )
                                   }
                                   disabled={currentPage === 1}>
                                   <ChevronLeft className='h-4 w-4' />
                              </Button>
                              <p className='text-sm text-muted-foreground'>
                                   Page {currentPage} of {totalPages}
                              </p>
                              <Button
                                   variant='outline'
                                   size='icon'
                                   onClick={() =>
                                        setCurrentPage((p) =>
                                             Math.min(p + 1, totalPages),
                                        )
                                   }
                                   disabled={currentPage === totalPages}>
                                   <ChevronRight className='h-4 w-4' />
                              </Button>
                         </div>
                    </div>
               )}
          </div>
     );
}
