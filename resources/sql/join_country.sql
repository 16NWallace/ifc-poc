CREATE TABLE dbi_protectMinorities AS( 
	SELECT doingbusiness_protectMinorities.*, country_codes.isoa2, country_codes.continent 
	FROM country_codes RIGHT OUTER JOIN doingbusiness_protectMinorities 
	ON country_codes.country = doingbusiness_protectMinorities.country);
