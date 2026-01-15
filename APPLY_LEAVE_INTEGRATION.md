# Apply Leave Redux Integration

## Files Created

### 1. Redux Slice
- **Path**: `store/reducers/leave/leaveSlice.tsx`
- **Purpose**: Manages leave application state (loading, success, error)

### 2. Action Types
- **Path**: `store/actions/leave/leave.types.ts`
- **Purpose**: TypeScript interface for leave request payload

### 3. Actions
- **Path**: `store/actions/leave/leave.actions.tsx`
- **Purpose**: API call to submit leave application

## Files Modified

### 1. RootReducer
- **Path**: `store/reducers/RootReducer.tsx`
- **Change**: Added leave reducer to the root reducer

### 2. ApplyLeave Screen
- **Path**: `screens/applyLeave/ApplyLeave.screen.tsx`
- **Changes**:
  - Integrated Redux for state management
  - Connected to leave API endpoint
  - Added loading state to submit button
  - Updated leave types to use IDs (1-5)
  - Added success/error handling with alerts
  - Form resets after successful submission
  - Uses vendorId from user state

## API Integration

**Endpoint**: `/leave-request`

**Request Body**:
```json
{
  "vendorId": 1,
  "leaveTypeId": 2,
  "startDate": "2026-01-16",
  "endDate": "2026-01-18",
  "reason": "nothing",
  "halfDays": []
}
```

## Leave Type IDs
1. Sick Leave
2. Casual Leave
3. Earned Leave
4. Personal Leave
5. Emergency Leave

## Usage

The apply leave screen now:
- Fetches vendorId from Redux user state
- Submits leave request to API
- Shows loading state during submission
- Displays success/error alerts
- Resets form on success
