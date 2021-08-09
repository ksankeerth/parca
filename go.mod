module github.com/parca-dev/parca

go 1.16

require (
	github.com/common-nighthawk/go-figure v0.0.0-20210622060536-734e95fb86be
	github.com/go-kit/kit v0.11.0
	github.com/go-kit/log v0.1.0
	github.com/google/pprof v0.0.0-20210609004039-a478d1d731e9
	github.com/grpc-ecosystem/go-grpc-middleware v1.3.0
	github.com/grpc-ecosystem/go-grpc-middleware/providers/kit/v2 v2.0.0-20201002093600-73cf2ae9d891
	github.com/grpc-ecosystem/go-grpc-middleware/v2 v2.0.0-rc.2.0.20201207153454-9f6bf00c00a7
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/grpc-ecosystem/grpc-gateway/v2 v2.5.0
	github.com/prometheus/prometheus v2.5.0+incompatible
	github.com/prometheus/tsdb v0.7.1
	github.com/spf13/cobra v1.2.1
	github.com/stretchr/testify v1.7.0
	github.com/thanos-io/thanos v0.22.0
	go.uber.org/atomic v1.9.0
	golang.org/x/net v0.0.0-20210505214959-0714010a04ed
	google.golang.org/genproto v0.0.0-20210617175327-b9e0b3197ced
	google.golang.org/grpc v1.38.0
	google.golang.org/grpc/cmd/protoc-gen-go-grpc v1.1.0
	google.golang.org/protobuf v1.27.1
	gopkg.in/yaml.v2 v2.4.0
)

replace github.com/prometheus/prometheus => github.com/prometheus/prometheus v1.8.2-0.20201130085533-a6e18916ab40
