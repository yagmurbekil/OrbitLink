namespace OrbitLinkApp.Models
{
    public class Organization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Country { get; set; }
        public string[] Tags { get; set; }
        public string[] Certs { get; set; }
        public string Trl { get; set; }
        public double Rating { get; set; }
        public int Reviews { get; set; }
        public int Reports { get; set; }
        public bool UnderReview { get; set; }
        public MatchScores Scores { get; set; }
        public int OverallMatch { get; set; }
    }

    public class MatchScores
    {
        public int CapabilityMatch { get; set; }
        public int DomainMatch { get; set; }
        public int TrlMatch { get; set; }
        public int CertMatch { get; set; }
    }
}
