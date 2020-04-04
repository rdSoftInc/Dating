namespace Dating.API.Helpers
{
    public class MessageParams
    {
        private const int MaxPageSize = 18;
        public int PageNumber { get; set; } = 1;

        private int pageSize = 9;
        
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        
        public int UserId { get; set; }

        public string MessageContainer { get; set; } = "Unread";

    }
}