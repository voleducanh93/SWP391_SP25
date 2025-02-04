﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChildVaccineSystem.Data.Entities
{
    public class VaccineInventory
    {
        [Key]
        public int VaccineInventoryId { get; set; }

        [ForeignKey("Vaccine")]
        public int VaccineId { get; set; }
        public Vaccine Vaccine { get; set; }

        public string BatchNumber { get; set; }
        public DateTime ManufacturingDate { get; set; }
        public int InitialQuantity { get; set; }
        public int QuantityInStock { get; set; }
        public string Supplier { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

}
