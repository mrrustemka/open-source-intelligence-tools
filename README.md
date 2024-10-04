I created SPA and data simulation in front-end part. I used:

1. React & TypeScript
2. SPA with Routes
3. Drag & Drop functionality
4. Local Storage to save cards
5. Random Data Simulation

In such project should implement following tests:

1. Input Field Tests:
   a. Invalid domain input
   b. Valid domain input
2. Card Management Tests:
   a. Card creation
   b. Notification tests
   c. Card state updates
3. Local Storage Tests:
   a. Load saved cards from localStorage  
   b. Save cards to localStorage
4. Drag-and-Drop Tests:
   a. Reorder cards
5. Button and Scan Submission Tests:
   a. Scan launch
   b. Click event

If I had more time I would implement all of listed tests.

To measure performance I am using Chrome DevTools, React Profiler.
To optimize my code we can use:

1. Memoization and Preventing Unnecessary Re-renders
2. Optimize Drag-and-Drop
3. Code splitting into chunks & Lazy Loading(in case we have too much domain cards)

My project may have the following bottlenecks:

1. Frequent Re-renders
2. Large Data Handling in State
3. Inefficient Drag-and-Drop with Large Lists
4. High Memory Usage with LocalStorage

My project improvements:

1. Implement backend
2. Add tooltips in modal window
3. Add cards to the start of list, not end of list
4. Optimize Drag-and-Drop
5. Error handling
6. Refactor to use useState
