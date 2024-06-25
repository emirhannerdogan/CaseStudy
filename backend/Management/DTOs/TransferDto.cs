public class TransferDto
{
    public int FromUserId { get; set; }
    public string FromUserName { get; set; }
    public int ToUserId { get; set; }
    public string ToUserName { get; set; }
    public decimal Amount { get; set; }
    public DateTime TransferDate { get; set; }
}