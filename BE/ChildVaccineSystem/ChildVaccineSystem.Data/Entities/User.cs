﻿using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ChildVaccineSystem.Data.Entities
{
    public class User : IdentityUser
    {
        public string? FullName { get; set; }
        public string? Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsActive { get; set; } = true;

        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public IdentityRole? Role { get; set; }
    }
}
