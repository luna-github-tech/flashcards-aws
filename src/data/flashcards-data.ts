export const FLASHCARDS: Flashcard[] = [
  // -----------------------------
  // Conceptos de la Nube
  // -----------------------------
  { id: 1, pregunta: "¿Qué modelo indica que AWS protege la nube y el cliente protege lo que corre dentro?", respuesta: "Modelo de responsabilidad compartida", categoria: "Conceptos de la Nube", dificultad: "Fácil", icon: "/images/aws-generic.svg" },
  { id: 2, pregunta: "¿Qué significa escalabilidad en la nube?", respuesta: "Capacidad de aumentar recursos bajo demanda", categoria: "Conceptos de la Nube", dificultad: "Fácil", icon: "/images/aws-generic.svg" },
  { id: 3, pregunta: "¿Qué ventaja ofrece el modelo de precios de AWS?", respuesta: "Pago por uso (pay-as-you-go)", categoria: "Conceptos de la Nube", dificultad: "Fácil", icon: "/images/aws-generic.svg" },
  { id: 4, pregunta: "¿Qué es la alta disponibilidad en la nube?", respuesta: "Diseño para minimizar el tiempo de inactividad", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 5, pregunta: "¿Qué son las Zonas de Disponibilidad?", respuesta: "Centros de datos independientes dentro de una Región AWS", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 6, pregunta: "¿Qué servicio permite crear infraestructura como código?", respuesta: "AWS CloudFormation", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 7, pregunta: "¿Qué servicio facilita arquitecturas híbridas conectando centros de datos locales con AWS?", respuesta: "AWS Direct Connect", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 8, pregunta: "¿Qué servicio proporciona asistencia técnica en AWS?", respuesta: "AWS Support Plans", categoria: "Conceptos de la Nube", dificultad: "Fácil", icon: "/images/aws-generic.svg" },
  { id: 9, pregunta: "¿Qué servicio facilita la migración de bases de datos hacia AWS?", respuesta: "AWS Database Migration Service (DMS)", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 10, pregunta: "¿Qué servicio ayuda a estimar la seguridad de tu aplicación con buenas prácticas?", respuesta: "AWS Well-Architected Tool", categoria: "Conceptos de la Nube", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Cómputo
  // -----------------------------
  { id: 11, pregunta: "Servicio de cómputo escalable basado en máquinas virtuales", respuesta: "Amazon EC2", categoria: "Cómputo", dificultad: "Fácil", icon: "/images/ec2.svg" },
  { id: 12, pregunta: "Servicio serverless para ejecutar código sin servidores", respuesta: "AWS Lambda", categoria: "Cómputo", dificultad: "Fácil", icon: "/images/lambda.svg" },
  { id: 13, pregunta: "Servicio para ejecutar contenedores con Kubernetes administrado", respuesta: "Amazon EKS", categoria: "Cómputo", dificultad: "Media", icon: "/images/eks.svg" },
  { id: 14, pregunta: "Servicio para ejecutar contenedores sin administrar servidores", respuesta: "AWS Fargate", categoria: "Cómputo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 15, pregunta: "Servicio para escalar automáticamente instancias EC2", respuesta: "Auto Scaling", categoria: "Cómputo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 16, pregunta: "Servicio para ejecutar entornos de desarrollo en la nube", respuesta: "AWS Cloud9", categoria: "Cómputo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 17, pregunta: "Servicio que permite ejecutar aplicaciones sin preocuparse de servidores, solo desplegar código", respuesta: "AWS Elastic Beanstalk", categoria: "Cómputo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 18, pregunta: "¿Qué servicio permite reservar capacidad de cómputo con descuento?", respuesta: "EC2 Reserved Instances", categoria: "Cómputo", dificultad: "Media", icon: "/images/ec2.svg" },
  { id: 19, pregunta: "¿Qué tipo de instancia EC2 se recomienda para pruebas de bajo costo?", respuesta: "EC2 Spot Instances", categoria: "Cómputo", dificultad: "Media", icon: "/images/ec2.svg" },
  { id: 20, pregunta: "¿Qué servicio permite ejecutar aplicaciones de escritorio en la nube?", respuesta: "Amazon WorkSpaces", categoria: "Cómputo", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Almacenamiento
  // -----------------------------
  { id: 21, pregunta: "Servicio de almacenamiento de objetos escalable y duradero", respuesta: "Amazon S3", categoria: "Almacenamiento", dificultad: "Fácil", icon: "/images/s3.svg" },
  { id: 22, pregunta: "Servicio de almacenamiento en bloques para EC2", respuesta: "Amazon EBS", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 23, pregunta: "Servicio de almacenamiento de archivos compartidos", respuesta: "Amazon EFS", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 24, pregunta: "Opción de almacenamiento de bajo costo para datos fríos en S3", respuesta: "S3 Glacier", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/s3.svg" },
  { id: 25, pregunta: "Servicio para transferir grandes cantidades de datos físicos a AWS", respuesta: "AWS Snowball", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 26, pregunta: "Servicio que permite acceder a datos locales y en S3 como si fueran uno solo", respuesta: "AWS Storage Gateway", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 27, pregunta: "¿Qué significa el SLA de S3 de 99.999999999%?", respuesta: "Alta durabilidad de los datos", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/s3.svg" },
  { id: 28, pregunta: "¿Qué servicio usarías para compartir archivos entre instancias Linux?", respuesta: "Amazon EFS", categoria: "Almacenamiento", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Bases de Datos
  // -----------------------------
  { id: 29, pregunta: "Servicio de base de datos relacional administrada", respuesta: "Amazon RDS", categoria: "Base de Datos", dificultad: "Fácil", icon: "/images/rds.svg" },
  { id: 30, pregunta: "Motor relacional compatible con MySQL y PostgreSQL optimizado en AWS", respuesta: "Amazon Aurora", categoria: "Base de Datos", dificultad: "Media", icon: "/images/aurora.svg" },
  { id: 31, pregunta: "Base de datos NoSQL de baja latencia", respuesta: "Amazon DynamoDB", categoria: "Base de Datos", dificultad: "Fácil", icon: "/images/dynamodb.svg" },
  { id: 32, pregunta: "Servicio de data warehouse escalable", respuesta: "Amazon Redshift", categoria: "Base de Datos", dificultad: "Media", icon: "/images/redshift.svg" },
  { id: 33, pregunta: "Servicio que facilita migraciones entre motores de base de datos", respuesta: "AWS Database Migration Service", categoria: "Base de Datos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 34, pregunta: "Servicio que ofrece caché administrado compatible con Redis/Memcached", respuesta: "Amazon ElastiCache", categoria: "Base de Datos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 35, pregunta: "Servicio de base de datos gráfica en AWS", respuesta: "Amazon Neptune", categoria: "Base de Datos", dificultad: "Difícil", icon: "/images/aws-generic.svg" },
  { id: 36, pregunta: "Servicio de base de datos ledger (libro mayor inmutable)", respuesta: "Amazon QLDB", categoria: "Base de Datos", dificultad: "Difícil", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Redes y Entrega de Contenido
  // -----------------------------
  { id: 37, pregunta: "Servicio de CDN global de AWS", respuesta: "Amazon CloudFront", categoria: "Redes", dificultad: "Fácil", icon: "/images/cloudfront.svg" },
  { id: 38, pregunta: "Servicio de DNS administrado", respuesta: "Amazon Route 53", categoria: "Redes", dificultad: "Fácil", icon: "/images/route53.svg" },
  { id: 39, pregunta: "Servicio para crear redes virtuales aisladas", respuesta: "Amazon VPC", categoria: "Redes", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 40, pregunta: "¿Qué es un Security Group en AWS?", respuesta: "Firewall virtual para instancias EC2", categoria: "Redes", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 41, pregunta: "¿Qué servicio distribuye tráfico entrante entre múltiples recursos?", respuesta: "Elastic Load Balancer", categoria: "Redes", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 42, pregunta: "¿Qué servicio conecta una red privada con Internet de forma segura?", respuesta: "NAT Gateway", categoria: "Redes", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 43, pregunta: "¿Qué servicio ayuda a optimizar la conectividad de red global?", respuesta: "AWS Global Accelerator", categoria: "Redes", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Seguridad
  // -----------------------------
  { id: 44, pregunta: "Servicio de gestión de usuarios y permisos", respuesta: "AWS IAM", categoria: "Seguridad", dificultad: "Fácil", icon: "/images/iam.svg" },
  { id: 45, pregunta: "Servicio de administración de claves de cifrado", respuesta: "AWS KMS", categoria: "Seguridad", dificultad: "Media", icon: "/images/kms.svg" },
  { id: 46, pregunta: "Servicio que detecta amenazas usando Machine Learning", respuesta: "Amazon GuardDuty", categoria: "Seguridad", dificultad: "Media", icon: "/images/guardduty.svg" },
  { id: 47, pregunta: "Servicio para gestionar secretos y contraseñas", respuesta: "AWS Secrets Manager", categoria: "Seguridad", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 48, pregunta: "Servicio que proporciona protección DDoS administrada", respuesta: "AWS Shield", categoria: "Seguridad", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 49, pregunta: "Servicio que gestiona firewalls a nivel de aplicación web", respuesta: "AWS WAF", categoria: "Seguridad", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 50, pregunta: "Servicio que centraliza el control de múltiples cuentas AWS", respuesta: "AWS Organizations", categoria: "Seguridad", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 51, pregunta: "Servicio que permite monitorear cumplimiento de normativas", respuesta: "AWS Artifact", categoria: "Seguridad", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Monitoreo y Gestión
  // -----------------------------
  { id: 52, pregunta: "Servicio para recolectar métricas y logs", respuesta: "Amazon CloudWatch", categoria: "Monitoreo", dificultad: "Fácil", icon: "/images/cloudwatch.svg" },
  { id: 53, pregunta: "Servicio para auditar cuentas y actividades", respuesta: "AWS CloudTrail", categoria: "Monitoreo", dificultad: "Fácil", icon: "/images/aws-generic.svg" },
  { id: 54, pregunta: "Servicio que evalúa configuraciones de recursos en AWS", respuesta: "AWS Config", categoria: "Monitoreo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 55, pregunta: "Servicio que permite crear tableros de operación centralizados", respuesta: "AWS Systems Manager", categoria: "Monitoreo", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 56, pregunta: "Servicio que permite analizar logs a través de consultas SQL", respuesta: "CloudWatch Logs Insights", categoria: "Monitoreo", dificultad: "Media", icon: "/images/cloudwatch.svg" },
  { id: 57, pregunta: "¿Qué servicio provee informes sobre costos, seguridad y buenas prácticas?", respuesta: "AWS Trusted Advisor", categoria: "Monitoreo", dificultad: "Media", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Facturación y Costos
  // -----------------------------
  { id: 58, pregunta: "Servicio para establecer alertas de gasto", respuesta: "AWS Budgets", categoria: "Costos", dificultad: "Fácil", icon: "/images/budgets.svg" },
  { id: 59, pregunta: "Herramienta para reportes detallados de facturación", respuesta: "AWS Cost Explorer", categoria: "Costos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 60, pregunta: "Servicio que permite estimar costos futuros", respuesta: "AWS Pricing Calculator", categoria: "Costos", dificultad: "Fácil", icon: "/images/pricing-calculator.svg" },
  { id: 61, pregunta: "¿Qué son las etiquetas (tags) en AWS?", respuesta: "Metadatos usados para organizar y controlar costos", categoria: "Costos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 62, pregunta: "¿Qué servicio permite consolidar facturación de varias cuentas?", respuesta: "AWS Organizations", categoria: "Costos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 63, pregunta: "¿Qué plan de soporte AWS incluye un TAM (Technical Account Manager)?", respuesta: "Enterprise Support", categoria: "Costos", dificultad: "Difícil", icon: "/images/aws-generic.svg" },

  // -----------------------------
  // Casos Prácticos (Examen)
  // -----------------------------
  { id: 64, pregunta: "¿Qué servicio usarías para un data lake?", respuesta: "Amazon S3", categoria: "Casos Prácticos", dificultad: "Fácil", icon: "/images/s3.svg" },
  { id: 65, pregunta: "¿Qué servicio usarías para análisis de grandes volúmenes de datos?", respuesta: "Amazon Redshift", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/redshift.svg" },
  { id: 66, pregunta: "¿Qué servicio recomendarías para ejecutar código en respuesta a eventos?", respuesta: "AWS Lambda", categoria: "Casos Prácticos", dificultad: "Fácil", icon: "/images/lambda.svg" },
  { id: 67, pregunta: "¿Qué servicio usarías para balancear tráfico entre instancias EC2?", respuesta: "Elastic Load Balancer (ELB)", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 68, pregunta: "¿Qué servicio usarías para copias de seguridad de bases de datos relacionales?", respuesta: "Amazon RDS Snapshots", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/rds.svg" },
  { id: 69, pregunta: "¿Qué servicio usarías para implementar un chatbot?", respuesta: "Amazon Lex", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 70, pregunta: "¿Qué servicio usarías para reconocimiento de imágenes?", respuesta: "Amazon Rekognition", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 71, pregunta: "¿Qué servicio usarías para transcripción de audio a texto?", respuesta: "Amazon Transcribe", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 72, pregunta: "¿Qué servicio usarías para traducción automática?", respuesta: "Amazon Translate", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 73, pregunta: "¿Qué servicio usarías para análisis de sentimientos?", respuesta: "Amazon Comprehend", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 74, pregunta: "¿Qué servicio usarías para crear modelos de Machine Learning sin programar?", respuesta: "Amazon SageMaker Canvas", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 75, pregunta: "¿Qué servicio usarías para monitorear un sitio web y medir latencia?", respuesta: "Amazon CloudWatch Synthetics", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/cloudwatch.svg" },
  { id: 76, pregunta: "¿Qué servicio usarías para mensajería desacoplada entre microservicios?", respuesta: "Amazon SQS", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 77, pregunta: "¿Qué servicio usarías para comunicación en tiempo real entre aplicaciones?", respuesta: "Amazon SNS", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 78, pregunta: "¿Qué servicio usarías para orquestación de flujos de trabajo serverless?", respuesta: "AWS Step Functions", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 79, pregunta: "¿Qué servicio usarías para cachear contenido web en el edge?", respuesta: "Amazon CloudFront", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/cloudfront.svg" },
  { id: 80, pregunta: "¿Qué servicio usarías para administrar API a escala?", respuesta: "Amazon API Gateway", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 81, pregunta: "¿Qué servicio usarías para integrar colas y microservicios de manera simple?", respuesta: "Amazon EventBridge", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 82, pregunta: "¿Qué servicio usarías para desplegar y versionar funciones de IA?", respuesta: "Amazon SageMaker", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 83, pregunta: "¿Qué servicio usarías para enviar correos transaccionales?", respuesta: "Amazon SES", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 84, pregunta: "¿Qué servicio usarías para gestionar certificados SSL?", respuesta: "AWS Certificate Manager", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 85, pregunta: "¿Qué servicio usarías para analizar logs de acceso y amenazas?", respuesta: "Amazon CloudWatch Logs Insights", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/cloudwatch.svg" },
  { id: 86, pregunta: "¿Qué servicio usarías para detectar cambios no autorizados en recursos?", respuesta: "AWS Config", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 87, pregunta: "¿Qué servicio usarías para crear pipelines CI/CD en AWS?", respuesta: "AWS CodePipeline", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 88, pregunta: "¿Qué servicio usarías para compilar y testear automáticamente código?", respuesta: "AWS CodeBuild", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 89, pregunta: "¿Qué servicio usarías para gestionar repositorios Git en AWS?", respuesta: "AWS CodeCommit", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 90, pregunta: "¿Qué servicio usarías para desplegar aplicaciones automáticamente?", respuesta: "AWS CodeDeploy", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 91, pregunta: "¿Qué servicio usarías para escanear vulnerabilidades en contenedores?", respuesta: "Amazon Inspector", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 92, pregunta: "¿Qué servicio usarías para crear chatbots con IA?", respuesta: "Amazon Lex", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 93, pregunta: "¿Qué servicio usarías para personalizar recomendaciones de productos?", respuesta: "Amazon Personalize", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 94, pregunta: "¿Qué servicio usarías para análisis de videos?", respuesta: "Amazon Rekognition Video", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 95, pregunta: "¿Qué servicio usarías para bases de datos multirregión activas?", respuesta: "Amazon DynamoDB Global Tables", categoria: "Casos Prácticos", dificultad: "Difícil", icon: "/images/dynamodb.svg" },
  { id: 96, pregunta: "¿Qué servicio usarías para configurar notificaciones de facturación?", respuesta: "AWS Budgets + SNS", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/budgets.svg" },
  { id: 97, pregunta: "¿Qué servicio usarías para ejecutar microservicios sin servidor con workflows?", respuesta: "AWS Step Functions", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 98, pregunta: "¿Qué servicio usarías para monitorear costos de cada proyecto?", respuesta: "AWS Cost Explorer con etiquetas (tags)", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" },
  { id: 99, pregunta: "¿Qué servicio usarías para almacenar backups de datos empresariales a largo plazo?", respuesta: "Amazon S3 Glacier Deep Archive", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/s3.svg" },
  { id: 100, pregunta: "¿Qué servicio usarías para crear dashboards de datos interactivos?", respuesta: "Amazon QuickSight", categoria: "Casos Prácticos", dificultad: "Media", icon: "/images/aws-generic.svg" }
]
