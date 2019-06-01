# tidb-dashboard

> tidb web dashboard

## Quick start

```sh
docker run \
  -p 3333:3000 \
  -d \
  -e TIDB="[\"http://172.19.0.13:10080\"]" \
  -e PD="[\"http://172.19.0.6:2379\", \"http://172.19.0.8:2379\", \"http://172.19.0.4:2379\"]" \
  -e PROMETHEUS="http://172.19.0.5:9090" \
  -e CACHE_TIME=1000 \
  you06/tidb-dashboard
```

## Dashboard configuration

`dashboard.json` controls backend data fetch and front end data visulization!

```json
{
  "name": "heap_memory_usage", // name of chart
  "display": "Heap Memory Usage", // friendly name, show as chart title
  "history": 600000, // display duration
  "type": "chart", // data display type
  "rule": "1|int", // how to access data, {key|type}, key can be chained with '.', example 'val.data.1'
  "rate": 1048576, // data scale, will be devided
  "unit": "MiB",
  "targets": [ // 
    {
      "id": "A", // unique key
      "expr": "go_memstats_heap_inuse_bytes{job=~\"tidb.*\"}", // Prometheus expression
      "tag": "", // tag to be displayed
      "children": [ // optional, display one expression in multi channels
        {
          "id": "A-1",
          "tagKey": "metric.instance" // how to access tag, tag will be overwrite by tag key
        },
        {
          "id": "A-2",
          "tagKey": "metric.instance"
        }
      ]
    }
  ]
}
```

## Todo

- [x] Server cache
- [x] Dashboard configuration
- [ ] Server render initial status
