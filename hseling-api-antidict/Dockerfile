FROM hseling/hseling-api-base:python3.6-alpine3.7 as hseling_api_build

LABEL maintainer="Aleksey Dorkin <avdorkin@edu.hse.ru>"

RUN mkdir /dependencies
COPY ./hseling-api-antidict/requirements.txt /dependencies/requirements.txt
COPY ./hseling-api-antidict/setup.py /dependencies/setup.py

RUN pip install -r /dependencies/requirements.txt

FROM hseling/hseling-api-base:python3.6-alpine3.7 as production

COPY --from=hseling_api_build /usr/local/lib/python3.6/site-packages /usr/local/lib/python3.6/site-packages
COPY --from=hseling_api_build /usr/lib/python3.6/site-packages /usr/lib/python3.6/site-packages

COPY --from=hseling_api_build /dependencies /dependencies

COPY ./hseling-lib-antidict /dependencies/hseling-lib-antidict
RUN pip install /dependencies/hseling-lib-antidict

COPY ./hseling-api-antidict/hseling_api_antidict /app/hseling_api_antidict
COPY ./hseling-api-antidict/main.py /app/main.py

RUN mkdir -p /data

ENV HSELING_API_ANTIDICT_SETTINGS="/app/hseling_api_antidict/default_settings.py"

HEALTHCHECK CMD curl --fail http://localhost:5000/api/healthz || exit 1

