using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Management.Data;
using Management.Models;

namespace Management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ManagementContext _context;

        public TransactionsController(ManagementContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions()
        {
            return await _context.Transactions.ToListAsync();
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            return transaction;
        }

        // PUT: api/Transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, TransactionDto transactionDto)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            transaction.Description = transactionDto.Description;
            transaction.Amount = transactionDto.Amount;
            transaction.TransactionDate = transactionDto.TransactionDate;

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/Transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(TransactionDto transactionDto)
        {
            var transaction = new Transaction
            {
                UserId = transactionDto.UserId,
                Description = transactionDto.Description,
                Amount = transactionDto.Amount,
                TransactionDate = transactionDto.TransactionDate
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransaction", new { id = transaction.TransactionId }, transaction);
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("User/{userId}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactionsByUserId(int userId)
        {
            var transactions = await _context.Transactions
                .Where(t => t.UserId == userId)
                .ToListAsync();

            if (transactions == null || transactions.Count == 0)
            {
                return NotFound("No transactions found for the specified user.");
            }

            return transactions;
        }
        private bool TransactionExists(int id)
        {
            return _context.Transactions.Any(e => e.TransactionId == id);
        }
    }
}
