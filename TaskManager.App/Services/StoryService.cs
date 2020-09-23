using TaskManager.App.Interfaces;
using TaskManager.App.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.App.Services
{
    public class StoryService : IStoryService
    {
        private List<Story> _stories;
        public StoryService(string path)
        {
            try
            {
                if (File.Exists(path))
                    _stories = JsonConvert.DeserializeObject<List<Story>>(File.ReadAllText(path));
            }
            catch (Exception)
            {
                throw new ArgumentException("path");
            }
        }

        public Story Get(int id) => _stories.FirstOrDefault(s => s.Id == id);

        public List<Story> GetAll() => _stories;
    }
}
