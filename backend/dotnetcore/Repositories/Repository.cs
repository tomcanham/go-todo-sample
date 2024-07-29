
using Microsoft.EntityFrameworkCore;

namespace TodoServer;

public class Repository<T> : IRepository<T> where T: class
{
  private readonly DbContext _dbContext;
  protected readonly DbSet<T> _dbSet;
  public Repository(DbContext dbContext)
  {
    _dbContext = dbContext;
    _dbSet = dbContext.Set<T>();
  }
  public void AddItem(T item)
  {
    _dbSet.Attach(item);
    _dbContext.SaveChanges();
  }

  public void DeleteItem(int id)
  {
    var item = _dbSet.Find(id);
    if (item != null)
    {
      _dbSet.Remove(item);
      _dbContext.SaveChanges();
    }
  }

  public T? GetItem(int id) => _dbSet.Find(id);

  public IEnumerable<T> GetItems() => _dbSet.ToList();

  public void UpdateItem(T item)
  {
    _dbSet.Attach(item);
    _dbContext.Entry(item).State = EntityState.Modified;
    _dbContext.SaveChanges();
  }
}
