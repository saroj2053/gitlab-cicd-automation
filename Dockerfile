# Using r-base image
FROM r-base:4.3.2

# Setting environment variables
ENV env=production

# Listing R packages to be installed
RUN R -e "install.packages(c('data.table', 'ggplot2', 'devtools', 'tidyverse'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE 8080

# Initializing command to run an R script or application
CMD ["Rscript","script.R"]
