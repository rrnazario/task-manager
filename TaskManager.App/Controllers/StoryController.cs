using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.App.Interfaces;
using TaskManager.App.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TaskManager.App.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoryController : Controller
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var stories = _storyService.GetAll();

            return Ok(stories);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var story = _storyService.Get(id);

            return Ok(story);
        }
    }
}
