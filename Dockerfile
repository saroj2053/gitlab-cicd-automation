# Using r-base image
FROM r-base:4.4.1

# Setting environment variables


# Listing R packages to be installed
RUN R -e "install.packages(c('caret', 'tidyverse', 'data.table'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port


# Initializing command to run an R script or application

