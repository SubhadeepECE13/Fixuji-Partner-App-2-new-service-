# Leave History Pagination Implementation

## Overview
Implemented infinite scroll pagination for Leave History screen following the same pattern as Orders screen.

## Changes Made

### 1. Redux Slice (`store/reducers/leave/leaveSlice.tsx`)

#### Added State
```typescript
isLeaveHistoryEnd: boolean  // Tracks if all data has been loaded
```

#### Added Actions
- `appendLeaveHistory`: Appends new data to existing leave history array
- `setIsLeaveHistoryEnd`: Sets flag when no more data is available

### 2. Redux Action (`store/actions/leave/leave.actions.tsx`)

#### Updated `getLeaveHistory` Function
**Before:**
```typescript
getLeaveHistory(vendorId: number)
```

**After:**
```typescript
getLeaveHistory(vendorId: number, page: number = 1, limit: number = 10)
```

#### Key Changes:
- Added `page` and `limit` parameters
- Uses `pageNo: page` and `pageSize: limit` in API request
- For page 1: Replaces data using `setleaveHistory`
- For page > 1: Appends data using `appendLeaveHistory`
- Sets `isLeaveHistoryEnd` to true when returned data length < limit

### 3. Leave History Screen (`screens/leaveHistory/LeaveHistory.screen.tsx`)

#### Added State Variables
```typescript
const [loadingMore, setLoadingMore] = useState(false);  // Loading state for pagination
const [page, setPage] = useState(1);                     // Current page number
```

#### Added `fetchLeaveHistory` Function
```typescript
const fetchLeaveHistory = async (pageNo = 1) => {
  if (pageNo !== 1) {
    if (loadingMore || isLeaveHistoryEnd) return;  // Prevent duplicate calls
    setLoadingMore(true);
  } else {
    setLoading(true);
  }

  if (user?.id) {
    await dispatch(getLeaveHistory(user.id, pageNo, 10));
  }

  setPage(pageNo + 1);
  setLoading(false);
  setLoadingMore(false);
};
```

#### Updated useEffect
- Resets `isLeaveHistoryEnd` flag
- Resets page to 1
- Fetches first page of data

#### Updated FlatList
- Added `onEndReached={() => fetchLeaveHistory(page)}` for infinite scroll
- Added `onEndReachedThreshold={0.5}` to trigger at 50% from bottom
- Added `ListFooterComponent` with ActivityIndicator for loading more state
- Fixed skeleton loader to show 3 items instead of `leaveHistory.length` (which is 0 initially)

## How It Works

1. **Initial Load**: 
   - Screen loads → fetches page 1 with 10 items
   - Shows skeleton loaders during initial load

2. **Scroll to Bottom**:
   - User scrolls to 50% from bottom
   - `onEndReached` triggers `fetchLeaveHistory(page)`
   - Shows footer loader (ActivityIndicator)
   - Fetches next page and appends to existing data

3. **End of Data**:
   - When API returns < 10 items, sets `isLeaveHistoryEnd = true`
   - Prevents further API calls

4. **Loading States**:
   - `loading`: Initial page load (shows skeleton)
   - `loadingMore`: Pagination load (shows footer loader)

## API Request Structure

```typescript
{
  pageNo: 1,           // Current page number
  pageSize: 10,        // Items per page
  shortCode: "LEAVE_REQUEST",
  sortBy: "createdAt",
  sortDir: "DESC",
  fixedSearch: {
    isActive: { type: "boolean", value: [true] },
    vendorId: { type: "number", value: [vendorId] }
  }
}
```

## Benefits

✅ Improved performance - loads data in chunks  
✅ Better UX - smooth infinite scroll  
✅ Reduced initial load time  
✅ Prevents loading all data at once  
✅ Consistent pattern with Orders screen  

## Testing Checklist

- [ ] Initial load shows 10 items
- [ ] Scroll triggers next page load
- [ ] Footer loader appears during pagination
- [ ] No duplicate API calls
- [ ] Stops loading when all data fetched
- [ ] Empty state shows when no data
- [ ] Skeleton loaders work correctly
