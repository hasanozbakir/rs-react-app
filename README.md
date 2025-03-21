# React Dev Tools - Performance Profiler

This document outlines the performance improvements made to the application using React's memoization tools (`React.memo`, `useMemo`, and `useCallback`). Below are the performance metrics before and after applying these optimizations.

---

## Performance Metrics

### 1. **Before Adding Any Memoization Tools**
The initial performance of the application without any optimizations:
![Without using any memoization](./src/assets/before-memo.png)

---

### 2. **After Adding `React.memo` to `CardList` Component**
Performance improvement after memoizing the `CardList` component:
![CardList memo](./src/assets/after-memo-list.png)

---

### 3. **Before Adding `React.memo` to `Card` Component**
Performance before memoizing individual `Card` components:
![Before Card memo](./src/assets/before-card-memo.png)

---

### 4. **After Adding `React.memo` to `Card` Component**
Performance after memoizing individual `Card` components:
![After memo](./src/assets/after-card-memo.png)

---

### 5. **Before Adding `useMemo` to `filteredCountries` List**
Performance before memoizing the `filteredCountries` list:
![Before useMemo](./src/assets/before-usememo-filtered.png)

---

### 6. **After Adding `useMemo` to `filteredCountries` List**
Performance after memoizing the `filteredCountries` list:
![After useMemo](./src/assets/after-usememo.png)

---

### 7. **After Adding `useCallback` to Event Handlers**
Performance after memoizing event handlers with `useCallback`:
![After useCallbacks](./src/assets/after-usecallbacks.png)

---

## Conclusion
As seen from the charts, the performance of the application improved significantly after applying the following optimizations:
1. Memoizing the `CardList` and `Card` components using `React.memo`.
2. Memoizing the `filteredCountries` list using `useMemo`.
3. Memoizing event handlers using `useCallback`.

These changes reduced unnecessary re-renders and improved the overall efficiency of the application, especially after fetching the countries' data initially.