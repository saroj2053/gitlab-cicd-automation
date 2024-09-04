# Using r-base image
ARG R_VERSION=4.2.1
FROM r-base:${R_VERSION}

# Setting environment variables
ARG ENV_KEY=
ARG ENV_VAL=undefined
ENV ${ENV_KEY}=${ENV_VAL}

# Installing system dependencies required for R packages
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    libxt-dev \
    libgit2-dev \
    pandoc \
    pandoc-citeproc \
    && rm -rf /var/lib/apt/lists/*

# Listing R packages to be installed
ARG R_PACKAGES="c('tidyverse', 'shiny', 'caret')"
RUN R -e "install.packages(${R_PACKAGES}, repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
ARG PORT=3000
EXPOSE ${PORT}

# Initializing command to run an R script or application
ARG START_COMMAND=""
CMD ["/bin/sh", "-c",  "${START_COMMAND}" ]