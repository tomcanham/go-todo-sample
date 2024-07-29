
using Microsoft.EntityFrameworkCore;

namespace TodoServer;

public class TodoRepository : ITodoRepository
{
  private readonly TodoDbContext _todoDbContext;

  public TodoRepository(TodoDbContext todoDbContext)
  {
    _todoDbContext = todoDbContext;
  }
  public void AddTodo(Todo todo)
  {
    _todoDbContext.Todos.Add(todo);
    _todoDbContext.SaveChanges();
  }

  public void DeleteTodo(int id)
  {
    var item = _todoDbContext.Todos.FirstOrDefault(item => item.Id == id);
    if (item != null)
    {
      _todoDbContext.Todos.Remove(item);
      _todoDbContext.SaveChanges();
    }
  }

  public Todo GetTodo(int id)
  {
    return _todoDbContext.Todos.FirstOrDefault(item => item.Id == id);
  }

  public IEnumerable<Todo> GetTodos()
  {
    return _todoDbContext.Todos.ToList();
  }

  public void UpdateTodo(Todo todo)
  {
    var item = _todoDbContext.Todos.FirstOrDefault(item => item.Id == todo.Id);
    if (item != null)
    {
      _todoDbContext.Entry(todo).State = EntityState.Modified;
      _todoDbContext.SaveChanges();
    }
  }
}
