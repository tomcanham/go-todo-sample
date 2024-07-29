namespace TodoServer;

public interface ITodoRepository
{
  IEnumerable<Todo> GetTodos();
  Todo GetTodo(int id);
  void AddTodo(Todo todo);
  void UpdateTodo(Todo todo);
  void DeleteTodo(int id);
}
