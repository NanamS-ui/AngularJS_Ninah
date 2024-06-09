using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using model;

namespace controller
{
    [ApiController]
    [Route("[controller]")]
    public class NumbersController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("random")]
        public ActionResult<Number> GenererNombre()
        {
            var random = new Random();
            var target = random.Next(1, 1001);
            var randomNumbers = new List<int>();

            for (int i = 0; i < 7; i++)
            {
                randomNumbers.Add(random.Next(1, 101));
            }

            var reponse = new Number
            {
                TargetNumber = target,
                RandomNumbers = randomNumbers
            };

            return Ok(reponse);
        }
    }
}
