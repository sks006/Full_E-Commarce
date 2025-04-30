import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Failed' | 'Paid' | 'Open' | 'Resolved' | 'Closed';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'default' | 'lg';
}

export function StatusBadge({ status, size = 'default' }: StatusBadgeProps) {
  const getVariant = (status: StatusType) => {
    switch (status) {
      case 'Pending':
      case 'Processing':
      case 'Open':
        return 'warning';
      case 'Shipped':
      case 'Delivered':
      case 'Paid':
      case 'Resolved':
      case 'Closed':
        return 'success';
      case 'Cancelled':
      case 'Failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const sizeClassMap = {
    sm: 'text-xs py-0 px-2',
    default: 'text-xs py-1 px-2.5',
    lg: 'text-sm py-1 px-3'
  };

  return (
    <Badge 
      variant={getVariant(status) as any} 
      className={cn(sizeClassMap[size])}
    >
      {status}
    </Badge>
  );
}