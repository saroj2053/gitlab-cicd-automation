# Using r-base image
FROM r-base:4.4.0

# Setting environment variables
ENV {{R_ENV_KEY}}={{R_ENV_VAL}}

# Listing R packages to be installed
RUN R -e "install.packages(c('ggplot2'), repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
EXPOSE {{R_PORT}}

# Initializing command to run an R script or application
CMD [{{R_START_SCRIPT}}]
