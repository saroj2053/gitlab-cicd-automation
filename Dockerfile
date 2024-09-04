# Using r-base image
FROM r-base:4.1.3

# Setting environment variables
ENV env=production

# Listing R packages to be installed
RUN R -e "install.packages(c('multcomp', 'quantmod', 'haven'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE 5000

# Initializing command to run an R script or application
CMD ['Rscript','my.R']
