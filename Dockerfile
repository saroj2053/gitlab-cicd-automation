# Using r-base image
FROM r-base:3.6.3

# Setting environment variables
ENV env=development

# Listing R packages to be installed
RUN R -e "install.packages(c('data.table', 'ggplot2'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE 3000

# Initializing command to run an R script or application
CMD ["Rscript","my.R"]
