# Using r-base image
FROM r-base:3.6.2

# Setting environment variables


# Listing R packages to be installed
RUN R -e "install.packages(c('survival'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port


# Initializing command to run an R script or application

