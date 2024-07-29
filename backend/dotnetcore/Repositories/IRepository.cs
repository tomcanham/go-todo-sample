namespace TodoServer;

public interface IRepository<T> where T: class
{
  IEnumerable<T> GetItems();
  T? GetItem(int id);
  void AddItem(T item);
  void UpdateItem(T item);
  void DeleteItem(int id);
}
