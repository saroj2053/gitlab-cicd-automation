# Using r-base image
FROM r-base:4.1.2

# Setting environment variables

ENV MYPASS=pass

# Listing R packages to be installed
RUN R -e "install.packages(c('data.table', 'survival', 'ggplot2', 'shiny'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE 5000

# Initializing command to run an R script or application
CMD R -e  "Rscript my.R"
