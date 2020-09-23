using TaskManager.App.Model;
using System.Collections.Generic;

namespace TaskManager.App.Interfaces
{
    public interface IStoryService
    {
        List<Story> GetAll();
        Story Get(int id);
    }
}
