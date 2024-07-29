using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TodoServer
{
  [Produces("application/json")]
  [Route("api/todos")]
  [ApiController]
  public class TodosController : ControllerBase
  {
    // private readonly ITodoRepository _repository;
    private readonly IRepository<Todo> _repository;

    public TodosController(IRepository<Todo> repository)
    {
      _repository = repository;
    }

    // READ all
    // GET api/todos
    [HttpGet]
    public ActionResult<IEnumerable<Todo>> Get()
    {
      var todos = _repository.GetItems();

      return Ok(todos);
    }

    // READ one
    // GET api/todos/{id}
    [HttpGet("{id}")]
    public ActionResult<Todo> Get(int id)
    {
      var todo = _repository.GetItem(id);
      if (todo == null)
      {
        return NotFound();
      }

      return Ok(todo);
    }

    // CREATE
    // POST api/todos
    [HttpPost]
    public ActionResult Post([FromBody] Todo todo)
    {
      todo.Id = null; // don't allow user-specified IDs

      _repository.AddItem(todo);
      return CreatedAtAction(nameof(Get), new { id = todo.Id }, todo);
    }

    // UPDATE
    // PUT api/todos/1
    [HttpPut("{id}")]
    public ActionResult Put(int id, [FromBody] Todo todo)
    {
      todo.Id = id;

      _repository.UpdateItem(todo);
      return NoContent();
    }

    // DELETE one
    // DELETE api/todos/1
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
      _repository.DeleteItem(id);
      return NoContent();
    }
  }
}