using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.App.Model
{
    public class StoryTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime EndDate { get; set; }
        public StoryTaskStatus Status { get; set; }
    }

    public enum StoryTaskStatus
    {
        Doing = 0,
        Done = 1
    }
}
