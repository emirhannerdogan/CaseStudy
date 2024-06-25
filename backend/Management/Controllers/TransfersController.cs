using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Management.Data;
using Management.Models;

namespace Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfersController : ControllerBase
    {
        private readonly ManagementContext _context;

        public TransfersController(ManagementContext context)
        {
            _context = context;
        }

        // GET: api/Transfers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transfer>>> GetTransfers()
        {
            return await _context.Transfers.ToListAsync();
        }

        // GET: api/Transfers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetTransfer(int id)
        {
            var transfer = await _context.Transfers.FindAsync(id);

            if (transfer == null)
            {
                return NotFound();
            }

            return transfer;
        }

        // PUT: api/Transfers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransfer(int id, TransferDto transferDto)
        {
            var transfer = await _context.Transfers.FindAsync(id);
            if (transfer == null)
            {
                return NotFound();
            }

            transfer.FromUserId = transferDto.FromUserId;
            transfer.ToUserId = transferDto.ToUserId;
            transfer.Amount = transferDto.Amount;
            transfer.TransferDate = transferDto.TransferDate;

            _context.Entry(transfer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransferExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Transfers
        [HttpPost]
        public async Task<ActionResult<Transfer>> PostTransfer(TransferDto transferDto)
        {
            var transfer = new Transfer
            {
                FromUserId = transferDto.FromUserId,
                ToUserId = transferDto.ToUserId,
                Amount = transferDto.Amount,
                TransferDate = transferDto.TransferDate
            };

            _context.Transfers.Add(transfer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransfer", new { id = transfer.TransferId }, transfer);
        }

        // DELETE: api/Transfers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransfer(int id)
        {
            var transfer = await _context.Transfers.FindAsync(id);
            if (transfer == null)
            {
                return NotFound();
            }

            _context.Transfers.Remove(transfer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TransferExists(int id)
        {
            return _context.Transfers.Any(e => e.TransferId == id);
        }
    }
}
