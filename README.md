# tt2

apiVersion: apps/v1
kind: Deployment
metadata:
  name: proxy-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: proxy
  template:
    metadata:
      labels:
        app: proxy
    spec:
      containers:
      - name: proxy-container
        image: tu-imagen-del-proxy
        ports:
        - containerPort: 80
        env:
          - name: QR_SERVICE_URL
            valueFrom:
              configMapKeyRef:
                name: proxy-config
                key: qr-service-url




apiVersion: v1
kind: Service
metadata:
  name: proxy-service
spec:
  selector:
    app: proxy
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer




apiVersion: apps/v1
kind: Deployment
metadata:
  name: qr-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: qr
  template:
    metadata:
      labels:
        app: qr
    spec:
      containers:
      - name: qr-container
        image: tu-imagen-de-qr
        ports:
        - containerPort: 80



apiVersion: v1
kind: Service
metadata:
  name: qr-service
spec:
  selector:
    app: qr
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: ClusterIP




apiVersion: v1
kind: ConfigMap
metadata:
  name: proxy-config
data:
  qr-service-url: "http://qr-service:80"
