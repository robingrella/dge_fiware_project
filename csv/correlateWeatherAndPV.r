# read in weather_mod.csv
weatherData <- read.csv(file.choose(), sep=";")

# print data types of weatherData
sapply(weatherData, class)

# read in pv_production.csv
pvData <- read.csv(file.choose(), sep=",")

# print data types of pvData
sapply(pvData, class)

# set date column to null
weatherData$dateObserved = NULL

# set date column to null
pvData$dateMeasured = NULL

# convert all weather data columns to numeric
weatherData[] <- lapply(weatherData, function(x) as.numeric(as.character(x)))

# correlate weather data and pv data with spearman method, delete all missing values before correlating 
cor(x=weatherData, y=pvData, method="spearman", use="complete.obs")