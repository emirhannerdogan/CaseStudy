namespace Management.Models
{
    public class Transfer
    {
        public int TransferId { get; set; }
        public int FromUserId { get; set; }
        public string FromUserName { get; set; }
        public int ToUserId { get; set; }
        public string ToUserName { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransferDate { get; set; }
    }
}
