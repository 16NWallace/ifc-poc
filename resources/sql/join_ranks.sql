CREATE TABLE ranks_all AS( 
	SELECT agg.*, construct.rank AS construction_rank, enforce.rank AS enforce_rank, credit.rank AS credit_rank, business.rank AS business_rank, trade.rank AS trade_rank 
	FROM agg_rank as agg
	INNER JOIN dbi_construction AS construct
		ON(agg.country=construct.country) AND (agg.year=construct.year) 
			AND (agg.isoa2=construct.isoa2) AND (agg.continent=construct.continent)

	INNER JOIN dbi_enforcingcontracts AS enforce
		ON(agg.country=enforce.country) AND (agg.year=enforce.year) 
			AND (agg.isoa2=enforce.isoa2) AND (agg.continent=enforce.continent)

	INNER JOIN dbi_gettingcredit AS credit
		ON(agg.country=credit.country) AND (agg.year=credit.year) 
			AND (agg.isoa2=credit.isoa2) AND (agg.continent=credit.continent)

	INNER JOIN dbi_startingbusiness AS business
		ON(agg.country=business.country) AND (agg.year=business.year) 
			AND (agg.isoa2=business.isoa2) AND (agg.continent=business.continent)
			
	INNER JOIN dbi_tradingacrossborders AS trade
		ON(agg.country=trade.country) AND (agg.year=trade.year) 
			AND (agg.isoa2=trade.isoa2) AND (agg.continent=trade.continent)
);