#!/bin/bash
echo "Start Replica MongoDB!"

mongosh --host docker.for.mac.host.internal:27017 <<EOF
var config = {
    "_id": "dbrs",
    "members": [
        {
            "_id": 0,
            "host": "docker.for.mac.host.internal:27017"
        }
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF
