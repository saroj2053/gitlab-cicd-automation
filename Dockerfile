# Using r-base image
FROM r-base:3.6.3

# Setting environment variables

ENV MY_PASS=pass

# Listing R packages to be installed
RUN R -e "install.packages(c('jsonlite', 'ggplot2', 'roxygen2', 'caret'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE 5000

# Initializing command to run an R script or application
CMD R -e  "Rscript my.R"
