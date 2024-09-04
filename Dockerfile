# Using r-base image
ARG R_VERSION=3.6.2
FROM r-base:${R_VERSION}

# Setting environment variables
ARG ENV_KEY=MY_PASS
ARG ENV_VAL=pass
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
ARG R_PACKAGES="c('shiny', 'tidyverse', 'dplyr', 'plotly', 'data.table')"
RUN R -e "install.packages(${R_PACKAGES}, repos='http://cran.rstudio.com/')"

# working directory inside the container
WORKDIR /app

# Copying application files into the container
COPY . /app

# Exposing port
ARG PORT=5000
EXPOSE ${PORT}

# Initializing command to run an R script or application
ARG START_COMMAND="Rscript my.R"
CMD ["/bin/sh", "-c",  "${START_COMMAND}" ]
