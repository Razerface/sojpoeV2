export const saveToLocalStorage = (assignments: Assignment[]) => {
  const history = getHistoryFromStorage();
  const newEntry = {
    assignments,
    id: Date.now().toString(),
  };
  
  history.unshift(newEntry);
  localStorage.setItem('assignmentHistory', JSON.stringify(history.slice(0, 10)));
};

export const getHistoryFromStorage = (): AssignmentHistory[] => {
  const stored = localStorage.getItem('assignmentHistory');
  return stored ? JSON.parse(stored) : [];
};