"use client";

import React, { useEffect, useMemo, useState } from "react";

// ---------------------------------------------
// Flashcards AWS CLF-C02 – Advanced (Next.js + Tailwind)
// - Estudio / Aleatorio / Examen (10)
// - Filtros por categoría y dificultad + búsqueda
// - Progreso en localStorage
// - Tarjeta con flip (mostrar/ocultar respuesta)
// ---------------------------------------------

// Tipos
export type Categoria =
  | "Fundamentos Cloud"
  | "Cómputo"
  | "Almacenamiento"
  | "Base de datos"
  | "Red"
  | "Seguridad"
  | "Facturación"
  | "Monitoreo";

export type Dificultad = "Fácil" | "Media" | "Difícil";

export type Flashcard = {
  id: number;
  pregunta: string;
  respuesta: string;
  categoria: Categoria;
  dificultad: Dificultad;
  imagen?: string;
  enlace?: string;
};

// Dataset (100)
const BASE_CARDS: Flashcard[] = [
  { id: 1,  pregunta: "¿Qué es la computación en la nube?", respuesta: "Entrega bajo demanda de recursos TI por internet con pago por uso.", categoria: "Fundamentos Cloud", dificultad: "Fácil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/what-is-cloud-computing/" },
  { id: 2,  pregunta: "¿Qué es una Región de AWS?", respuesta: "Ubicación geográfica que contiene múltiples Zonas de Disponibilidad (AZ).", categoria: "Fundamentos Cloud", dificultad: "Fácil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/" },
  { id: 3,  pregunta: "¿Qué es una Zona de Disponibilidad (AZ)?", respuesta: "Uno o más datacenters aislados dentro de una región con baja latencia entre ellos.", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/" },
  { id: 4,  pregunta: "Servicio para definir infraestructura como código", respuesta: "AWS CloudFormation.", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/cloudformation/" },
  { id: 5,  pregunta: "¿Qué es serverless?", respuesta: "Modelo donde AWS gestiona la infraestructura; tú solo subes código (p. ej., Lambda).", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/serverless/" },
  { id: 6,  pregunta: "Pilares del Well-Architected Framework", respuesta: "Excelencia operativa, seguridad, fiabilidad, eficiencia de rendimiento, optimización de costos y sostenibilidad.", categoria: "Fundamentos Cloud", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/architecture/well-architected/" },
  { id: 7,  pregunta: "Elasticidad vs Escalabilidad", respuesta: "Elasticidad ajusta recursos automáticamente; escalabilidad aumenta/disminuye capacidad según demanda.", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/autoscaling/" },
  { id: 8,  pregunta: "Adopción multi-cuenta en AWS", respuesta: "Separar entornos y dominios con AWS Organizations y guardrails.", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/organizations/" },
  { id: 9,  pregunta: "¿Qué son los edge locations?", respuesta: "Puntos perimetrales para caché/routing de baja latencia (CloudFront/Route 53).", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/cloudfront/" },
  { id: 10, pregunta: "¿Qué es el Free Tier?", respuesta: "Cuotas gratuitas limitadas para probar servicios AWS.", categoria: "Fundamentos Cloud", dificultad: "Fácil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/free/" },
  { id: 11, pregunta: "Alta disponibilidad (HA)", respuesta: "Diseño que minimiza interrupciones usando redundancia (Multi-AZ/Auto Scaling).", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/about-aws/global-infrastructure/regions_az/" },
  { id: 12, pregunta: "Herramienta para evaluar arquitecturas", respuesta: "AWS Well-Architected Tool.", categoria: "Fundamentos Cloud", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/well-architected-tool/" },

  { id: 13, pregunta: "Servicio de cómputo basado en instancias", respuesta: "Amazon EC2.", categoria: "Cómputo", dificultad: "Fácil",  imagen: "/images/ec2.svg", enlace: "https://aws.amazon.com/es/ec2/" },
  { id: 14, pregunta: "Ejecución de código sin servidores", respuesta: "AWS Lambda.", categoria: "Cómputo", dificultad: "Fácil",  imagen: "/images/lambda.svg", enlace: "https://aws.amazon.com/es/lambda/" },
  { id: 15, pregunta: "Orquestación de contenedores con Kubernetes", respuesta: "Amazon EKS.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/eks.svg", enlace: "https://aws.amazon.com/es/eks/" },
  { id: 16, pregunta: "Orquestación nativa de contenedores AWS", respuesta: "Amazon ECS.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/ecs/" },
  { id: 17, pregunta: "Cómputo serverless para contenedores", respuesta: "AWS Fargate.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/fargate/" },
  { id: 18, pregunta: "Escalado automático de capacidad", respuesta: "Auto Scaling.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/autoscaling/" },
  { id: 19, pregunta: "Balanceador capa 7 (HTTP/HTTPS)", respuesta: "Application Load Balancer (ALB).", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticloadbalancing/features/#Application_Load_Balancer" },
  { id: 20, pregunta: "Balanceador capa 4 (TCP/UDP)", respuesta: "Network Load Balancer (NLB).", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticloadbalancing/features/#Network_Load_Balancer" },
  { id: 21, pregunta: "Plataforma PaaS para desplegar apps", respuesta: "AWS Elastic Beanstalk.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticbeanstalk/" },
  { id: 22, pregunta: "Trabajos por lotes sin administrar clúster", respuesta: "AWS Batch.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/batch/" },
  { id: 23, pregunta: "Ejecución de funciones en el edge", respuesta: "Lambda@Edge.", categoria: "Cómputo", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/cloudfront/" },
  { id: 24, pregunta: "Compromisos de ahorro de cómputo", respuesta: "Savings Plans (Compute/Instance).", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/savingsplans/" },

  { id: 25, pregunta: "Almacenamiento de objetos duradero", respuesta: "Amazon S3.", categoria: "Almacenamiento", dificultad: "Fácil",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/" },
  { id: 26, pregunta: "Almacenamiento en bloques para EC2", respuesta: "Amazon EBS.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/ebs/" },
  { id: 27, pregunta: "Sistema de archivos NFS administrado", respuesta: "Amazon EFS.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/efs/" },
  { id: 28, pregunta: "Archivado de bajo costo", respuesta: "S3 Glacier / Deep Archive.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/storage-classes/glacier/" },
  { id: 29, pregunta: "Clase de S3 para patrones desconocidos", respuesta: "S3 Intelligent-Tiering.", categoria: "Almacenamiento", dificultad: "Difícil",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/storage-classes/intelligent-tiering/" },
  { id: 30, pregunta: "Mover/expirar objetos automáticamente", respuesta: "S3 Lifecycle Policies.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/" },
  { id: 31, pregunta: "Acceso on-prem a S3 como si fuera local", respuesta: "AWS Storage Gateway.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/storagegateway/" },
  { id: 32, pregunta: "Replicación entre regiones de buckets", respuesta: "S3 Cross-Region Replication (CRR).", categoria: "Almacenamiento", dificultad: "Difícil",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/" },
  { id: 33, pregunta: "Bloqueo de acceso público", respuesta: "S3 Block Public Access.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/s3/" },
  { id: 34, pregunta: "Montaje compartido entre múltiples EC2", respuesta: "Amazon EFS.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/efs/" },
  { id: 35, pregunta: "EBS vs EFS vs S3", respuesta: "EBS: bloques; EFS: archivos; S3: objetos.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/s3/" },
  { id: 36, pregunta: "Entrega de objetos vía CDN", respuesta: "S3 + CloudFront.", categoria: "Almacenamiento", dificultad: "Media",  imagen: "/images/cloudfront.svg", enlace: "https://aws.amazon.com/es/cloudfront/" },

  { id: 37, pregunta: "Relacional administrada (múltiples motores)", respuesta: "Amazon RDS.", categoria: "Base de datos", dificultad: "Fácil",  imagen: "/images/rds.svg", enlace: "https://aws.amazon.com/es/rds/" },
  { id: 38, pregunta: "Motor relacional optimizado por AWS", respuesta: "Amazon Aurora.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/aurora.svg", enlace: "https://aws.amazon.com/es/rds/aurora/" },
  { id: 39, pregunta: "NoSQL clave-valor/documento", respuesta: "Amazon DynamoDB.", categoria: "Base de datos", dificultad: "Fácil",  imagen: "/images/dynamodb.svg", enlace: "https://aws.amazon.com/es/dynamodb/" },
  { id: 40, pregunta: "Caché en memoria administrado", respuesta: "Amazon ElastiCache (Redis/Memcached).", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticache/" },
  { id: 41, pregunta: "Data warehouse petabyte-scale", respuesta: "Amazon Redshift.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/redshift.svg", enlace: "https://aws.amazon.com/es/redshift/" },
  { id: 42, pregunta: "ETL/catálogo de datos serverless", respuesta: "AWS Glue (Data Catalog/Jobs).", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/glue/" },
  { id: 43, pregunta: "Read Replicas vs Multi-AZ en RDS", respuesta: "Read Replicas: escalar lectura; Multi-AZ: alta disponibilidad.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/rds.svg", enlace: "https://aws.amazon.com/es/rds/" },
  { id: 44, pregunta: "Acelerador en DynamoDB", respuesta: "DAX (DynamoDB Accelerator).", categoria: "Base de datos", dificultad: "Difícil",  imagen: "/images/dynamodb.svg", enlace: "https://aws.amazon.com/es/dynamodb/dax/" },
  { id: 45, pregunta: "Backups automáticos en RDS", respuesta: "Snapshots y backups automáticos configurables.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/rds.svg", enlace: "https://aws.amazon.com/es/rds/" },
  { id: 46, pregunta: "Consultas serverless sobre S3", respuesta: "Amazon Athena.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/athena/" },
  { id: 47, pregunta: "BD gráfica administrada", respuesta: "Amazon Neptune.", categoria: "Base de datos", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/neptune/" },
  { id: 48, pregunta: "Ledger inmutable administrado", respuesta: "Amazon QLDB.", categoria: "Base de datos", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/qldb/" },

  { id: 49, pregunta: "DNS administrado y health checks", respuesta: "Amazon Route 53.", categoria: "Red", dificultad: "Fácil",  imagen: "/images/route53.svg", enlace: "https://aws.amazon.com/es/route53/" },
  { id: 50, pregunta: "CDN global de baja latencia", respuesta: "Amazon CloudFront.", categoria: "Red", dificultad: "Fácil",  imagen: "/images/cloudfront.svg", enlace: "https://aws.amazon.com/es/cloudfront/" },
  { id: 51, pregunta: "Red virtual aislada", respuesta: "Amazon VPC.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/vpc/" },
  { id: 52, pregunta: "Salida a internet desde subred privada", respuesta: "NAT Gateway.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" },
  { id: 53, pregunta: "Conectividad dedicada a AWS", respuesta: "AWS Direct Connect.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/directconnect/" },
  { id: 54, pregunta: "Políticas de enrutamiento de Route 53", respuesta: "Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-value.", categoria: "Red", dificultad: "Difícil",  imagen: "/images/route53.svg", enlace: "https://aws.amazon.com/es/route53/" },
  { id: 55, pregunta: "Security Groups vs NACLs", respuesta: "SG (stateful) por instancia; NACL (stateless) por subred.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/vpc/" },
  { id: 56, pregunta: "VPC Endpoints", respuesta: "Acceso privado a servicios sin internet (Gateway/Interface).", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/privatelink/" },
  { id: 57, pregunta: "Transit Gateway", respuesta: "Enrutamiento centralizado entre VPCs y on-prem.", categoria: "Red", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/transit-gateway/" },
  { id: 58, pregunta: "Global Accelerator", respuesta: "Optimiza la ruta global con IPs estáticas Anycast.", categoria: "Red", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/global-accelerator/" },
  { id: 59, pregunta: "Balanceo capa 7", respuesta: "Application Load Balancer.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticloadbalancing/features/#Application_Load_Balancer" },
  { id: 60, pregunta: "Balanceo capa 4", respuesta: "Network Load Balancer.", categoria: "Red", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/elasticloadbalancing/features/#Network_Load_Balancer" },

  { id: 61, pregunta: "Gestión de identidades y accesos", respuesta: "AWS IAM.", categoria: "Seguridad", dificultad: "Fácil",  imagen: "/images/iam.svg", enlace: "https://aws.amazon.com/es/iam/" },
  { id: 62, pregunta: "Autenticación multifactor (MFA)", respuesta: "Añade un segundo factor para inicio de sesión o asunción de rol.", categoria: "Seguridad", dificultad: "Fácil",  imagen: "/images/iam.svg", enlace: "https://aws.amazon.com/es/iam/" },
  { id: 63, pregunta: "Gestión de claves de cifrado", respuesta: "AWS KMS con integración nativa.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/kms.svg", enlace: "https://aws.amazon.com/es/kms/" },
  { id: 64, pregunta: "Detección continua de amenazas", respuesta: "Amazon GuardDuty.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/guardduty.svg", enlace: "https://aws.amazon.com/es/guardduty/" },
  { id: 65, pregunta: "Web Application Firewall", respuesta: "AWS WAF.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/waf/" },
  { id: 66, pregunta: "Protección DDoS", respuesta: "AWS Shield (Standard/Advanced).", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/shield/" },
  { id: 67, pregunta: "Gestión de secretos", respuesta: "AWS Secrets Manager.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/secrets-manager/" },
  { id: 68, pregunta: "Auditoría de llamadas API", respuesta: "AWS CloudTrail.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/cloudtrail/" },
  { id: 69, pregunta: "Evaluación de configuraciones", respuesta: "AWS Config.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/config/" },
  { id: 70, pregunta: "Accesos temporales con federación", respuesta: "Roles IAM + AWS STS.", categoria: "Seguridad", dificultad: "Media",  imagen: "/images/iam.svg", enlace: "https://aws.amazon.com/es/iam/features/manage-federation/" },
  { id: 71, pregunta: "Centro unificado de hallazgos", respuesta: "AWS Security Hub.", categoria: "Seguridad", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/security-hub/" },
  { id: 72, pregunta: "Permisos máximos a nivel organización", respuesta: "SCPs en AWS Organizations.", categoria: "Seguridad", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/organizations/" },

  { id: 73, pregunta: "Estimar costos de arquitecturas", respuesta: "AWS Pricing Calculator.", categoria: "Facturación", dificultad: "Fácil",  imagen: "/images/pricing-calculator.svg", enlace: "https://calculator.aws/#/" },
  { id: 74, pregunta: "Visualizar uso y gasto", respuesta: "AWS Cost Explorer.", categoria: "Facturación", dificultad: "Fácil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/aws-cost-management/aws-cost-explorer/" },
  { id: 75, pregunta: "Alertas por umbrales de gasto", respuesta: "AWS Budgets.", categoria: "Facturación", dificultad: "Fácil",  imagen: "/images/budgets.svg", enlace: "https://aws.amazon.com/es/aws-cost-management/aws-budgets/" },
  { id: 76, pregunta: "Facturación consolidada", respuesta: "AWS Organizations (Consolidated Billing).", categoria: "Facturación", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/organizations/" },
  { id: 77, pregunta: "Instancias con descuento por compromiso", respuesta: "Reserved Instances.", categoria: "Facturación", dificultad: "Media",  imagen: "/images/ec2.svg", enlace: "https://aws.amazon.com/es/ec2/pricing/reserved-instances/" },
  { id: 78, pregunta: "Planes flexibles de descuento", respuesta: "Savings Plans (Compute/Instance).", categoria: "Facturación", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/savingsplans/" },
  { id: 79, pregunta: "Reducción de costos con interrupción", respuesta: "EC2 Spot Instances (hasta ~90% menos).", categoria: "Facturación", dificultad: "Media",  imagen: "/images/ec2.svg", enlace: "https://aws.amazon.com/es/ec2/spot/" },
  { id: 80, pregunta: "Reporte detallado de uso/costo", respuesta: "AWS Cost & Usage Report (CUR).", categoria: "Facturación", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/aws-cost-management/aws-cost-and-usage-reporting/" },
  { id: 81, pregunta: "Etiquetas para distribuir costos", respuesta: "Cost Allocation Tags.", categoria: "Facturación", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/aws-cost-management/aws-cost-explorer/" },
  { id: 82, pregunta: "Optimización de tamaños", respuesta: "AWS Compute Optimizer.", categoria: "Facturación", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/compute-optimizer/" },
  { id: 83, pregunta: "Detección de anomalías de gasto", respuesta: "Cost Anomaly Detection.", categoria: "Facturación", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/aws-cost-management/aws-cost-anomaly-detection/" },
  { id: 84, pregunta: "¿Qué plan incluye TAM?", respuesta: "Enterprise Support.", categoria: "Facturación", dificultad: "Difícil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/premiumsupport/plans/" },

  { id: 85, pregunta: "Métricas, logs y alarmas", respuesta: "Amazon CloudWatch.", categoria: "Monitoreo", dificultad: "Fácil",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 86, pregunta: "Trazas distribuidas", respuesta: "AWS X-Ray.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/xray/" },
  { id: 87, pregunta: "Paneles de métricas", respuesta: "CloudWatch Dashboards.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 88, pregunta: "Consultas sobre logs", respuesta: "CloudWatch Logs Insights.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 89, pregunta: "Auditoría de eventos de cuenta", respuesta: "AWS CloudTrail.", categoria: "Monitoreo", dificultad: "Fácil",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/cloudtrail/" },
  { id: 90, pregunta: "Inventario y evaluación de recursos", respuesta: "AWS Config.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/config/" },
  { id: 91, pregunta: "Orquestación operativa (SSM)", respuesta: "AWS Systems Manager.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/systems-manager/" },
  { id: 92, pregunta: "Monitoreo sintético", respuesta: "CloudWatch Synthetics (canaries).", categoria: "Monitoreo", dificultad: "Difícil",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 93, pregunta: "Estados de una alarma", respuesta: "OK, ALARM, INSUFFICIENT_DATA.", categoria: "Monitoreo", dificultad: "Fácil",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 94, pregunta: "Alertas por correo", respuesta: "SNS + CloudWatch Alarms.", categoria: "Monitoreo", dificultad: "Fácil",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/sns/" },
  { id: 95, pregunta: "Centralizar logs multi-cuenta", respuesta: "Logs con suscripciones o Kinesis Firehose.", categoria: "Monitoreo", dificultad: "Difícil",  imagen: "/images/cloudwatch.svg", enlace: "https://aws.amazon.com/es/cloudwatch/" },
  { id: 96, pregunta: "Eventos para integrar servicios", respuesta: "Amazon EventBridge.", categoria: "Monitoreo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/eventbridge/" },

  { id: 97, pregunta: "Acceso privado a S3 sin IGW", respuesta: "Gateway VPC Endpoint para S3.", categoria: "Red", dificultad: "Media",  imagen: "/images/s3.svg", enlace: "https://aws.amazon.com/es/privatelink/" },
  { id: 98, pregunta: "BD relacional altamente disponible", respuesta: "RDS Multi-AZ.", categoria: "Base de datos", dificultad: "Media",  imagen: "/images/rds.svg", enlace: "https://aws.amazon.com/es/rds/" },
  { id: 99, pregunta: "Distribución global con baja latencia", respuesta: "CloudFront + ALB + Auto Scaling.", categoria: "Red", dificultad: "Difícil",  imagen: "/images/cloudfront.svg", enlace: "https://aws.amazon.com/es/cloudfront/" },
  { id: 100, pregunta: "Desacoplar productores y consumidores", respuesta: "SNS + SQS.", categoria: "Cómputo", dificultad: "Media",  imagen: "/images/aws-generic.svg", enlace: "https://aws.amazon.com/es/sns/" },
 {
    id: 101,
    pregunta: "¿Cuál servicio de AWS permite ejecutar código sin administrar servidores?\nOpciones:\nA) Amazon EC2\nB) AWS Lambda\nC) Amazon ECS\nD) AWS Batch",
    respuesta: "B) AWS Lambda",
    categoria: "Cómputo",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/lambda/"
  },
  {
    id: 102,
    pregunta: "Un cliente requiere una base de datos relacional altamente disponible con failover automático en otra AZ.\nOpciones:\nA) Amazon RDS Multi-AZ\nB) Amazon RDS Read Replica\nC) Amazon DynamoDB\nD) Amazon Aurora Serverless",
    respuesta: "A) Amazon RDS Multi-AZ",
    categoria: "Base de datos",
    dificultad: "Media",
    enlace: "https://docs.aws.amazon.com/es_es/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"
  },
  {
    id: 103,
    pregunta: "¿Qué servicio de AWS se utiliza para almacenamiento de objetos?\nOpciones:\nA) Amazon EBS\nB) Amazon EFS\nC) Amazon S3\nD) AWS Storage Gateway",
    respuesta: "C) Amazon S3",
    categoria: "Almacenamiento",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/s3/"
  },
  {
    id: 104,
    pregunta: "¿Cuál servicio de AWS es un firewall de aplicaciones web administrado?\nOpciones:\nA) AWS WAF\nB) AWS Shield\nC) AWS Firewall Manager\nD) Amazon GuardDuty",
    respuesta: "A) AWS WAF",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/waf/"
  },
  {
    id: 105,
    pregunta: "Una empresa quiere un sistema de mensajería para desacoplar productores y consumidores.\nOpciones:\nA) Amazon Kinesis\nB) Amazon MQ\nC) SNS + SQS\nD) AWS Step Functions",
    respuesta: "C) SNS + SQS",
    categoria: "Integración",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/sqs/"
  },
  {
    id: 106,
    pregunta: "¿Qué servicio de AWS se usa para monitoreo de métricas, logs y alarmas?\nOpciones:\nA) AWS CloudTrail\nB) Amazon CloudWatch\nC) AWS X-Ray\nD) AWS Config",
    respuesta: "B) Amazon CloudWatch",
    categoria: "Monitoreo",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/cloudwatch/"
  },
  {
    id: 107,
    pregunta: "¿Qué servicio ofrece detección automática de amenazas en AWS?\nOpciones:\nA) Amazon Inspector\nB) Amazon GuardDuty\nC) AWS Shield\nD) AWS Config",
    respuesta: "B) Amazon GuardDuty",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/guardduty/"
  },
  {
    id: 108,
    pregunta: "¿Qué servicio permite ejecutar contenedores sin administrar servidores?\nOpciones:\nA) Amazon ECS con EC2\nB) AWS Fargate\nC) Amazon EKS\nD) AWS Lambda",
    respuesta: "B) AWS Fargate",
    categoria: "Cómputo",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/fargate/"
  },
  {
    id: 109,
    pregunta: "Una empresa necesita distribuir contenido global con baja latencia. ¿Qué servicio debería usar?\nOpciones:\nA) Amazon Route 53\nB) AWS Direct Connect\nC) Amazon CloudFront\nD) Amazon VPC",
    respuesta: "C) Amazon CloudFront",
    categoria: "Red",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/cloudfront/"
  },
  {
    id: 110,
    pregunta: "¿Cuál es el servicio recomendado para crear y gestionar infraestructura como código?\nOpciones:\nA) AWS Config\nB) AWS OpsWorks\nC) AWS CloudFormation\nD) AWS Systems Manager",
    respuesta: "C) AWS CloudFormation",
    categoria: "Fundamentos Cloud",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/cloudformation/"
  },
  {
    id: 111,
    pregunta: "¿Qué servicio proporciona almacenamiento en bloques persistente para instancias EC2?\nOpciones:\nA) Amazon S3\nB) Amazon EFS\nC) Amazon EBS\nD) AWS Backup",
    respuesta: "C) Amazon EBS",
    categoria: "Almacenamiento",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/ebs/"
  },
  {
    id: 112,
    pregunta: "¿Qué servicio es un sistema de base de datos NoSQL clave-valor totalmente administrado?\nOpciones:\nA) Amazon Aurora\nB) Amazon RDS\nC) Amazon DynamoDB\nD) Amazon Neptune",
    respuesta: "C) Amazon DynamoDB",
    categoria: "Base de datos",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/dynamodb/"
  },
  {
    id: 113,
    pregunta: "¿Qué servicio se utiliza para crear una red privada virtual en AWS?\nOpciones:\nA) Amazon VPC\nB) Amazon Direct Connect\nC) AWS Transit Gateway\nD) Amazon CloudFront",
    respuesta: "A) Amazon VPC",
    categoria: "Red",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/vpc/"
  },
  {
    id: 114,
    pregunta: "¿Qué servicio se usa para gestionar identidades y permisos?\nOpciones:\nA) AWS STS\nB) Amazon Cognito\nC) AWS IAM\nD) AWS Organizations",
    respuesta: "C) AWS IAM",
    categoria: "Seguridad",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/iam/"
  },
  {
    id: 115,
    pregunta: "¿Cuál de los siguientes servicios es un data warehouse en la nube?\nOpciones:\nA) Amazon Athena\nB) Amazon Aurora\nC) Amazon Redshift\nD) Amazon Neptune",
    respuesta: "C) Amazon Redshift",
    categoria: "Base de datos",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/redshift/"
  },
  {
    id: 116,
    pregunta: "¿Qué servicio de AWS permite el archivado de datos a bajo costo?\nOpciones:\nA) Amazon S3 Glacier\nB) Amazon EFS\nC) AWS Backup\nD) AWS Storage Gateway",
    respuesta: "A) Amazon S3 Glacier",
    categoria: "Almacenamiento",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/glacier/"
  },
  {
    id: 117,
    pregunta: "¿Qué servicio se recomienda para implementar arquitecturas de microservicios y flujos de trabajo serverless?\nOpciones:\nA) AWS Step Functions\nB) AWS Batch\nC) Amazon MQ\nD) AWS CloudTrail",
    respuesta: "A) AWS Step Functions",
    categoria: "Integración",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/step-functions/"
  },
  {
    id: 118,
    pregunta: "¿Cuál servicio administra claves de cifrado y ofrece integración con otros servicios de AWS?\nOpciones:\nA) AWS KMS\nB) AWS Secrets Manager\nC) AWS Certificate Manager\nD) Amazon GuardDuty",
    respuesta: "A) AWS KMS",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/kms/"
  },
  {
    id: 119,
    pregunta: "¿Qué herramienta permite estimar costos de arquitecturas en AWS?\nOpciones:\nA) AWS Cost Explorer\nB) AWS Budgets\nC) AWS Pricing Calculator\nD) AWS Cost & Usage Report",
    respuesta: "C) AWS Pricing Calculator",
    categoria: "Facturación",
    dificultad: "Fácil",
    enlace: "https://calculator.aws/#/"
  },
  {
    id: 120,
    pregunta: "¿Qué servicio permite auditar todas las llamadas a la API en AWS?\nOpciones:\nA) AWS CloudTrail\nB) AWS Config\nC) Amazon CloudWatch\nD) AWS Security Hub",
    respuesta: "A) AWS CloudTrail",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/cloudtrail/"
  },
  {
    id: 121,
    pregunta: "¿Qué servicio ayuda a implementar políticas de configuración y compliance en recursos de AWS?\nOpciones:\nA) AWS CloudTrail\nB) AWS Config\nC) AWS Security Hub\nD) Amazon Inspector",
    respuesta: "B) AWS Config",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/config/"
  },
  {
    id: 122,
    pregunta: "¿Qué servicio de AWS permite orquestar Kubernetes de forma administrada?\nOpciones:\nA) Amazon ECS\nB) AWS Fargate\nC) Amazon EKS\nD) AWS Batch",
    respuesta: "C) Amazon EKS",
    categoria: "Cómputo",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/eks/"
  },
  {
    id: 123,
    pregunta: "¿Qué servicio se recomienda para transmisión de datos en tiempo real (streaming)?\nOpciones:\nA) Amazon Kinesis\nB) Amazon SQS\nC) AWS Batch\nD) Amazon SNS",
    respuesta: "A) Amazon Kinesis",
    categoria: "Integración",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/kinesis/"
  },
  {
    id: 124,
    pregunta: "¿Qué servicio de AWS es ideal para ejecutar aplicaciones web completas sin administrar infraestructura?\nOpciones:\nA) AWS Lambda\nB) AWS Elastic Beanstalk\nC) Amazon EC2\nD) Amazon ECS",
    respuesta: "B) AWS Elastic Beanstalk",
    categoria: "Cómputo",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/elasticbeanstalk/"
  },
  {
    id: 125,
    pregunta: "¿Qué servicio de red proporciona DNS administrado?\nOpciones:\nA) Amazon CloudFront\nB) Amazon Route 53\nC) AWS Global Accelerator\nD) AWS Direct Connect",
    respuesta: "B) Amazon Route 53",
    categoria: "Red",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/route53/"
  },
  {
    id: 126,
    pregunta: "¿Cuál servicio permite la integración de aplicaciones a través de eventos?\nOpciones:\nA) AWS Step Functions\nB) Amazon EventBridge\nC) Amazon Kinesis\nD) Amazon MQ",
    respuesta: "B) Amazon EventBridge",
    categoria: "Integración",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/eventbridge/"
  },
  {
    id: 127,
    pregunta: "¿Qué servicio provee caché en memoria administrada compatible con Redis y Memcached?\nOpciones:\nA) Amazon ElastiCache\nB) Amazon DynamoDB DAX\nC) AWS Lambda\nD) Amazon Aurora",
    respuesta: "A) Amazon ElastiCache",
    categoria: "Base de datos",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/elasticache/"
  },
  {
    id: 128,
    pregunta: "¿Qué servicio es un ledger inmutable administrado?\nOpciones:\nA) Amazon QLDB\nB) Amazon Aurora\nC) Amazon Neptune\nD) AWS Glue",
    respuesta: "A) Amazon QLDB",
    categoria: "Base de datos",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/qldb/"
  },
  {
    id: 129,
    pregunta: "¿Qué servicio se recomienda para detectar anomalías de gasto?\nOpciones:\nA) AWS Cost Explorer\nB) AWS Budgets\nC) Cost Anomaly Detection\nD) AWS Compute Optimizer",
    respuesta: "C) Cost Anomaly Detection",
    categoria: "Facturación",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/cost-anomaly-detection/"
  },
  {
    id: 130,
    pregunta: "¿Qué servicio ayuda a optimizar el tamaño de instancias para reducir costos?\nOpciones:\nA) AWS Compute Optimizer\nB) AWS Cost Explorer\nC) AWS Budgets\nD) AWS Pricing Calculator",
    respuesta: "A) AWS Compute Optimizer",
    categoria: "Facturación",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/compute-optimizer/"
  },
  {
    id: 131,
    pregunta: "¿Qué servicio permite establecer alertas cuando se supera un presupuesto?\nOpciones:\nA) AWS Budgets\nB) AWS Cost Explorer\nC) AWS Pricing Calculator\nD) Cost Anomaly Detection",
    respuesta: "A) AWS Budgets",
    categoria: "Facturación",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/budgets/"
  },
  {
    id: 132,
    pregunta: "¿Qué servicio es ideal para consultas interactivas en S3 usando SQL?\nOpciones:\nA) Amazon Athena\nB) Amazon Redshift\nC) AWS Glue\nD) Amazon EMR",
    respuesta: "A) Amazon Athena",
    categoria: "Base de datos",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/athena/"
  },
  {
    id: 133,
    pregunta: "¿Qué servicio se utiliza para descubrimiento y clasificación de datos sensibles?\nOpciones:\nA) AWS Config\nB) Amazon Macie\nC) AWS Inspector\nD) AWS GuardDuty",
    respuesta: "B) Amazon Macie",
    categoria: "Seguridad",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/macie/"
  },
  {
    id: 134,
    pregunta: "¿Qué servicio provee un firewall de red centralizado administrado en AWS?\nOpciones:\nA) AWS WAF\nB) AWS Firewall Manager\nC) AWS Shield\nD) AWS Network Firewall",
    respuesta: "D) AWS Network Firewall",
    categoria: "Seguridad",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/network-firewall/"
  },
  {
    id: 135,
    pregunta: "¿Qué servicio ayuda a los desarrolladores a encontrar vulnerabilidades en aplicaciones?\nOpciones:\nA) Amazon Inspector\nB) AWS Config\nC) AWS GuardDuty\nD) AWS Shield",
    respuesta: "A) Amazon Inspector",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/inspector/"
  },
  {
    id: 136,
    pregunta: "¿Qué servicio permite mensajería en tiempo real compatible con protocolos estándar como MQTT y AMQP?\nOpciones:\nA) Amazon SQS\nB) Amazon SNS\nC) Amazon MQ\nD) Amazon Kinesis",
    respuesta: "C) Amazon MQ",
    categoria: "Integración",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/amazon-mq/"
  },
  {
    id: 137,
    pregunta: "¿Qué servicio ofrece conectividad dedicada entre on-premises y AWS?\nOpciones:\nA) Amazon VPC\nB) AWS Transit Gateway\nC) AWS Direct Connect\nD) AWS Global Accelerator",
    respuesta: "C) AWS Direct Connect",
    categoria: "Red",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/directconnect/"
  },
  {
    id: 138,
    pregunta: "¿Qué servicio permite optimizar la conectividad global con direcciones IP estáticas anycast?\nOpciones:\nA) AWS Global Accelerator\nB) Amazon CloudFront\nC) Amazon Route 53\nD) AWS Direct Connect",
    respuesta: "A) AWS Global Accelerator",
    categoria: "Red",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/global-accelerator/"
  },
  {
    id: 139,
    pregunta: "¿Qué servicio permite crear paneles de métricas personalizados?\nOpciones:\nA) CloudWatch Logs Insights\nB) CloudWatch Dashboards\nC) AWS Config\nD) AWS X-Ray",
    respuesta: "B) CloudWatch Dashboards",
    categoria: "Monitoreo",
    dificultad: "Media",
    enlace: "https://docs.aws.amazon.com/es_es/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html"
  },
  {
    id: 140,
    pregunta: "¿Qué servicio provee trazas distribuidas para depuración de aplicaciones?\nOpciones:\nA) AWS X-Ray\nB) Amazon CloudWatch\nC) AWS Config\nD) AWS GuardDuty",
    respuesta: "A) AWS X-Ray",
    categoria: "Monitoreo",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/xray/"
  },
  {
    id: 141,
    pregunta: "¿Qué servicio permite gestionar certificados SSL/TLS?\nOpciones:\nA) AWS Secrets Manager\nB) AWS KMS\nC) AWS Certificate Manager\nD) Amazon Inspector",
    respuesta: "C) AWS Certificate Manager",
    categoria: "Seguridad",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/certificate-manager/"
  },
  {
    id: 142,
    pregunta: "¿Qué servicio permite centralizar hallazgos de seguridad de múltiples cuentas?\nOpciones:\nA) AWS Security Hub\nB) AWS Config\nC) AWS GuardDuty\nD) Amazon Inspector",
    respuesta: "A) AWS Security Hub",
    categoria: "Seguridad",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/security-hub/"
  },
{
    id: 143,
    pregunta: "¿Qué servicio de AWS permite almacenar y recuperar secretos como contraseñas y tokens?\nOpciones:\nA) AWS KMS\nB) AWS Secrets Manager\nC) AWS Certificate Manager\nD) Amazon Macie",
    respuesta: "B) AWS Secrets Manager",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/secrets-manager/"
  },
  {
    id: 144,
    pregunta: "¿Qué servicio permite ejecutar cargas de trabajo batch a gran escala sin necesidad de administrar servidores?\nOpciones:\nA) AWS Batch\nB) AWS Step Functions\nC) Amazon ECS\nD) AWS Lambda",
    respuesta: "A) AWS Batch",
    categoria: "Cómputo",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/batch/"
  },
  {
    id: 145,
    pregunta: "¿Qué servicio de AWS ayuda a descubrir, preparar y combinar datos para análisis y ML?\nOpciones:\nA) AWS Glue\nB) Amazon Athena\nC) Amazon EMR\nD) Amazon Kinesis",
    respuesta: "A) AWS Glue",
    categoria: "Analítica",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/glue/"
  },
  {
    id: 146,
    pregunta: "¿Qué servicio de AWS proporciona un motor de búsqueda administrado basado en Elasticsearch?\nOpciones:\nA) Amazon Athena\nB) Amazon OpenSearch Service\nC) AWS Glue Data Catalog\nD) Amazon Redshift",
    respuesta: "B) Amazon OpenSearch Service",
    categoria: "Analítica",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/opensearch-service/"
  },
  {
    id: 147,
    pregunta: "¿Qué servicio permite mover grandes cantidades de datos físicos a AWS mediante dispositivos?\nOpciones:\nA) AWS DataSync\nB) AWS Snowball\nC) AWS Direct Connect\nD) Amazon S3 Transfer Acceleration",
    respuesta: "B) AWS Snowball",
    categoria: "Migración",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/snowball/"
  },
  {
    id: 148,
    pregunta: "¿Qué servicio permite migrar bases de datos heterogéneas a AWS con mínima interrupción?\nOpciones:\nA) AWS Database Migration Service (DMS)\nB) AWS Glue\nC) AWS Snowball\nD) Amazon RDS",
    respuesta: "A) AWS Database Migration Service (DMS)",
    categoria: "Migración",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/dms/"
  },
  {
    id: 149,
    pregunta: "¿Qué servicio se utiliza para implementar CI/CD en AWS?\nOpciones:\nA) AWS CodeDeploy\nB) AWS CodePipeline\nC) AWS CodeBuild\nD) Todas las anteriores",
    respuesta: "D) Todas las anteriores",
    categoria: "DevOps",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/devops/"
  },
  {
    id: 150,
    pregunta: "¿Qué servicio ofrece entornos de desarrollo en la nube listos para usar?\nOpciones:\nA) AWS CodeCommit\nB) AWS Cloud9\nC) AWS CodeBuild\nD) AWS Lambda",
    respuesta: "B) AWS Cloud9",
    categoria: "DevOps",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/cloud9/"
  },
  {
    id: 151,
    pregunta: "¿Qué servicio de AWS proporciona repositorios privados basados en Git?\nOpciones:\nA) AWS CodeDeploy\nB) AWS CodeCommit\nC) AWS CodePipeline\nD) AWS Cloud9",
    respuesta: "B) AWS CodeCommit",
    categoria: "DevOps",
    dificultad: "Fácil",
    enlace: "https://aws.amazon.com/es/codecommit/"
  },
  {
    id: 152,
    pregunta: "¿Qué servicio de AWS ofrece almacenamiento compartido y escalable para múltiples instancias EC2?\nOpciones:\nA) Amazon EFS\nB) Amazon S3\nC) Amazon EBS\nD) AWS Backup",
    respuesta: "A) Amazon EFS",
    categoria: "Almacenamiento",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/efs/"
  },
  {
    id: 153,
    pregunta: "¿Qué servicio de AWS permite crear data lakes en S3 y catalogar metadatos?\nOpciones:\nA) AWS Glue Data Catalog\nB) Amazon Redshift Spectrum\nC) Amazon EMR\nD) Amazon Athena",
    respuesta: "A) AWS Glue Data Catalog",
    categoria: "Analítica",
    dificultad: "Difícil",
    enlace: "https://docs.aws.amazon.com/glue/latest/dg/populate-data-catalog.html"
  },
  {
    id: 154,
    pregunta: "¿Qué servicio permite ejecutar aplicaciones Hadoop y Spark administradas en AWS?\nOpciones:\nA) AWS Glue\nB) Amazon EMR\nC) Amazon Athena\nD) AWS Batch",
    respuesta: "B) Amazon EMR",
    categoria: "Analítica",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/emr/"
  },
  {
    id: 155,
    pregunta: "¿Qué servicio de AWS permite detectar desviaciones de seguridad en configuraciones?\nOpciones:\nA) AWS Config\nB) AWS Trusted Advisor\nC) AWS Security Hub\nD) Amazon Inspector",
    respuesta: "B) AWS Trusted Advisor",
    categoria: "Seguridad",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/premiumsupport/trustedadvisor/"
  },
  {
    id: 156,
    pregunta: "¿Qué servicio ofrece una visión unificada del uso de múltiples cuentas AWS?\nOpciones:\nA) AWS Organizations\nB) AWS Control Tower\nC) AWS Config\nD) AWS Cost Explorer",
    respuesta: "A) AWS Organizations",
    categoria: "Fundamentos Cloud",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/organizations/"
  },
  {
    id: 157,
    pregunta: "¿Qué servicio ayuda a establecer una landing zone multi-cuenta en AWS?\nOpciones:\nA) AWS Organizations\nB) AWS Control Tower\nC) AWS Config\nD) AWS Systems Manager",
    respuesta: "B) AWS Control Tower",
    categoria: "Fundamentos Cloud",
    dificultad: "Difícil",
    enlace: "https://aws.amazon.com/es/controltower/"
  },
  {
    id: 158,
    pregunta: "¿Qué servicio de AWS permite implementar un contact center en la nube?\nOpciones:\nA) Amazon Chime\nB) Amazon Connect\nC) Amazon WorkSpaces\nD) Amazon Pinpoint",
    respuesta: "B) Amazon Connect",
    categoria: "Aplicaciones empresariales",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/connect/"
  },
  {
    id: 159,
    pregunta: "¿Qué servicio de AWS es una solución de correo electrónico en la nube?\nOpciones:\nA) Amazon Pinpoint\nB) Amazon SES\nC) Amazon WorkMail\nD) Ambas B y C",
    respuesta: "D) Ambas B y C",
    categoria: "Aplicaciones empresariales",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/ses/"
  },
  {
    id: 160,
    pregunta: "¿Qué servicio de AWS permite acceso seguro a escritorios remotos?\nOpciones:\nA) Amazon WorkSpaces\nB) Amazon AppStream 2.0\nC) Amazon WorkDocs\nD) AWS Client VPN",
    respuesta: "A) Amazon WorkSpaces",
    categoria: "Aplicaciones empresariales",
    dificultad: "Media",
    enlace: "https://aws.amazon.com/es/workspaces/"
  }



];

// Utils
const CATEGORIAS: Categoria[] = [
  "Fundamentos Cloud",
  "Cómputo",
  "Almacenamiento",
  "Base de datos",
  "Red",
  "Seguridad",
  "Facturación",
  "Monitoreo",
];

const DIFICULTADES: Dificultad[] = ["Fácil", "Media", "Difícil"];

function clsx(...args: (string | boolean | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 🎨 Colores de Tag por categoría
function tagColor(c: Categoria) {
  switch (c) {
    case "Seguridad":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800";
    case "Almacenamiento":
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800";
    case "Cómputo":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800";
    case "Red":
      return "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-200 dark:border-violet-800";
    case "Base de datos":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800";
    case "Facturación":
      return "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-200 dark:border-cyan-800";
    case "Monitoreo":
      return "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:border-pink-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700";
  }
}

// Persistencia
const LS_KEY = "aws-clf-c02-flashcards-progress";

type Progress = {
  learned: Record<number, boolean>;
  seen: Record<number, number>;
  correct: Record<number, number>;
  wrong: Record<number, number>;
};

function loadProgress(): Progress {
  if (typeof window === "undefined") return { learned: {}, seen: {}, correct: {}, wrong: {} };
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { learned: {}, seen: {}, correct: {}, wrong: {} };
    return JSON.parse(raw);
  } catch {
    return { learned: {}, seen: {}, correct: {}, wrong: {} };
  }
}

function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(p));
}

// Chips y Tags
function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full border px-2 py-0.5 text-xs", className)}>
      {children}
    </span>
  );
}

function Pill({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "rounded-2xl px-3 py-1 text-sm transition",
        active
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "bg-white text-gray-700 border hover:bg-gray-50 dark:bg-neutral-900 dark:text-gray-100 dark:border-neutral-800 hover:dark:bg-neutral-800",
        "border"
      )}
    >
      {children}
    </button>
  );
}

function Card({
  card,
  learned,
  onToggleLearned,
  onSeen,
}: {
  card: Flashcard;
  learned?: boolean;
  onToggleLearned?: (id: number) => void;
  onSeen?: (id: number) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    onSeen?.(card.id);
    setFlipped(false); // al cambiar de tarjeta, vuelve a la pregunta
  }, [card.id]);

  return (
    <div className="relative">
      <div className="group mx-auto grid max-w-3xl grid-cols-1 gap-4">
        <div className="relative h-[340px] w-full [perspective:1000px]">
          <div
            className={clsx(
              "absolute inset-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 [transform-style:preserve-3d]",
              flipped ? "[transform:rotateY(180deg)]" : ""
            )}
          >
            {/* Front */}
            <div className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-orange-100 via-yellow-50 to-blue-50 p-5 [backface-visibility:hidden] dark:from-blue-900 dark:via-purple-900 dark:to-neutral-900">
              <div className="flex items-center gap-3">
                <div className="size-12 shrink-0 overflow-hidden rounded-xl bg-white/70 backdrop-blur flex items-center justify-center dark:bg-neutral-700/50">
                  {card.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="icono servicio" src={card.imagen} className="max-h-10 max-w-10" />
                  ) : (
                    <span className="text-2xl">☁️</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className={tagColor(card.categoria)}>{card.categoria}</Tag>
                  <Tag className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-neutral-800 dark:text-gray-200 dark:border-neutral-700">{card.dificultad}</Tag>
                  {learned && <Tag className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800">Aprendida ✅</Tag>}
                </div>
              </div>
              <div className="mt-4 text-balance text-xl font-semibold leading-snug text-gray-900 dark:text-gray-50">
                {card.pregunta}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-600 dark:text-gray-400">Haz clic para ver la respuesta</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFlipped(true)}
                    className="rounded-xl border border-transparent bg-blue-600 text-white px-3 py-1.5 text-sm shadow hover:scale-105 hover:bg-blue-700 transition-transform"
                  >
                    Mostrar respuesta
                  </button>
                  <button
                    onClick={() => onToggleLearned?.(card.id)}
                    className={clsx(
                      "rounded-xl border px-3 py-1.5 text-sm",
                      learned
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "border-transparent bg-blue-600 text-white shadow hover:scale-105 hover:bg-blue-700 transition-transform"
                    )}
                  >
                    {learned ? "Marcada como aprendida" : "Marcar como aprendida"}
                  </button>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 rounded-2xl bg-white p-5 [transform:rotateY(180deg)] [backface-visibility:hidden] dark:bg-neutral-900">
              <div className="text-sm uppercase tracking-wide text-gray-500 dark:text-gray-400">Respuesta</div>
              <div className="mt-2 text-lg text-gray-900 dark:text-gray-100">{card.respuesta}</div>
              {card.enlace && (
                <a
                  className="mt-4 inline-flex text-sm text-blue-600 underline hover:no-underline dark:text-blue-400"
                  href={card.enlace}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver documentación oficial ↗
                </a>
              )}
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setFlipped(false)}
                  className="rounded-xl border border-transparent bg-blue-600 text-white px-3 py-1.5 text-sm shadow hover:scale-105 hover:bg-blue-700 transition-transform"
                >
                  Volver a la pregunta
                </button>
                <button
                  onClick={() => onToggleLearned?.(card.id)}
                  className={clsx(
                    "rounded-xl border px-3 py-1.5 text-sm",
                    learned
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "border-transparent bg-blue-600 text-white shadow hover:scale-105 hover:bg-blue-700 transition-transform"
                  )}
                >
                  {learned ? "Marcada como aprendida" : "Marcar como aprendida"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Controles
function Controls({
  categorias,
  categoriaSel,
  setCategoriaSel,
  difSel,
  setDifSel,
  query,
  setQuery,
  mode,
  setMode,
  onReset,
  progressPct,
}: {
  categorias: Categoria[];
  categoriaSel: Categoria | "Todas";
  setCategoriaSel: (c: Categoria | "Todas") => void;
  difSel: Dificultad | "Todas";
  setDifSel: (d: Dificultad | "Todas") => void;
  query: string;
  setQuery: (q: string) => void;
  mode: "Estudio" | "Aleatorio" | "Examen";
  setMode: (m: "Estudio" | "Aleatorio" | "Examen") => void;
  onReset: () => void;
  progressPct: number;
}) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-5xl flex-col gap-4">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-semibold tracking-tight">Flashcards AWS CLF-C02</h1>
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all"
              style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
            />
          </div>
          <span className="text-gray-600 dark:text-gray-300">{progressPct.toFixed(0)}% aprendido</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border p-3 dark:border-neutral-800 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar (p. ej. S3, Lambda, DNS, costos)"
          className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-900"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={categoriaSel}
            onChange={(e) => setCategoriaSel(e.target.value as Categoria | "Todas")}
            className="rounded-xl border px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <option value="Todas">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={difSel}
            onChange={(e) => setDifSel(e.target.value as Dificultad | "Todas")}
            className="rounded-xl border px-3 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <option value="Todas">Todas las dificultades</option>
            {DIFICULTADES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Pill active={mode === "Estudio"} onClick={() => setMode("Estudio")}>
            Estudio
          </Pill>
          <Pill active={mode === "Aleatorio"} onClick={() => setMode("Aleatorio")}>
            Aleatorio
          </Pill>
          <Pill active={mode === "Examen"} onClick={() => setMode("Examen")}>
            Examen
          </Pill>
        </div>
        <button onClick={onReset} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
          Reiniciar progreso
        </button>
      </div>
    </div>
  );
}

// Vista principal
export default function FlashcardsApp() {
  const [cards] = useState<Flashcard[]>(BASE_CARDS);
  const [progress, setProgress] = useState<Progress>(loadProgress());

  const [categoriaSel, setCategoriaSel] = useState<Categoria | "Todas">("Todas");
  const [difSel, setDifSel] = useState<Dificultad | "Todas">("Todas");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<"Estudio" | "Aleatorio" | "Examen">("Estudio");

  // Examen
  const [examDeck, setExamDeck] = useState<Flashcard[]>([]);
  const [examIdx, setExamIdx] = useState(0);
  const [examScore, setExamScore] = useState({ ok: 0, total: 0 });

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const filtered = useMemo(() => {
    let list = [...cards];
    if (categoriaSel !== "Todas") list = list.filter((c) => c.categoria === categoriaSel);
    if (difSel !== "Todas") list = list.filter((c) => c.dificultad === difSel);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) => c.pregunta.toLowerCase().includes(q) || c.respuesta.toLowerCase().includes(q) || c.categoria.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cards, categoriaSel, difSel, query]);

  const learnedCount = useMemo(() => Object.values(progress.learned).filter(Boolean).length, [progress.learned]);
  const progressPct = (learnedCount / cards.length) * 100;

  function toggleLearned(id: number) {
    setProgress((p) => ({ ...p, learned: { ...p.learned, [id]: !p.learned[id] } }));
  }

  function markSeen(id: number) {
    setProgress((p) => ({ ...p, seen: { ...p.seen, [id]: (p.seen[id] || 0) + 1 } }));
  }

  function resetProgress() {
    setProgress({ learned: {}, seen: {}, correct: {}, wrong: {} });
    setExamDeck([]);
    setExamIdx(0);
    setExamScore({ ok: 0, total: 0 });
  }

  // Aleatorio
  const [randomIdx, setRandomIdx] = useState(0);
  const randomDeck = useMemo(() => shuffle(filtered), [filtered, mode]);

  function nextRandom() {
    setRandomIdx((i) => (i + 1) % Math.max(1, randomDeck.length));
  }

  // Examen
  function startExam() {
    const deck = shuffle(filtered).slice(0, Math.min(10, filtered.length));
    setExamDeck(deck);
    setExamIdx(0);
    setExamScore({ ok: 0, total: deck.length });
  }

  function answerExam(ok: boolean) {
    const current = examDeck[examIdx];
    if (!current) return;
    setProgress((p) => ({
      ...p,
      correct: { ...p.correct, [current.id]: (p.correct[current.id] || 0) + (ok ? 1 : 0) },
      wrong: { ...p.wrong, [current.id]: (p.wrong[current.id] || 0) + (!ok ? 1 : 0) },
    }));
    setExamScore((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total }));
    setExamIdx((i) => i + 1);
  }

  const showCard = useMemo(() => {
    if (mode === "Estudio") return filtered[0];
    if (mode === "Aleatorio") return randomDeck[randomIdx];
    if (mode === "Examen") return examDeck[examIdx];
    return filtered[0];
  }, [mode, filtered, randomDeck, randomIdx, examDeck, examIdx]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Controls
        categorias={CATEGORIAS}
        categoriaSel={categoriaSel}
        setCategoriaSel={setCategoriaSel}
        difSel={difSel}
        setDifSel={setDifSel}
        query={query}
        setQuery={setQuery}
        mode={mode}
        setMode={setMode}
        onReset={resetProgress}
        progressPct={progressPct}
      />

      {/* Acciones por modo */}
      <div className="mx-auto mb-6 flex w-full max-w-3xl items-center justify-between gap-3">
        {mode === "Aleatorio" && (
          <button onClick={nextRandom} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
            Siguiente aleatoria ↻
          </button>
        )}
        {mode === "Examen" && (
          <div className="flex items-center gap-3">
            <button onClick={startExam} className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
              {examDeck.length ? "Reiniciar examen" : "Iniciar examen (10)"}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Aciertos: <b>{examScore.ok}</b> / {examDeck.length || 0}
            </div>
          </div>
        )}
      </div>

      {/* Grid de tarjetas */}
      {mode === "Estudio" ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((c) => (
            <Card key={c.id} card={c} learned={!!progress.learned[c.id]} onToggleLearned={toggleLearned} onSeen={markSeen} />
          ))}
          {!filtered.length && (
            <div className="col-span-full rounded-2xl border p-8 text-center text-sm text-gray-600 dark:border-neutral-800 dark:text-gray-300">
              No hay tarjetas con los filtros actuales.
            </div>
          )}
        </div>
      ) : (
        <div>
          {showCard ? (
            <div>
              <Card card={showCard} learned={!!progress.learned[showCard.id]} onToggleLearned={toggleLearned} onSeen={markSeen} />
              {mode === "Examen" && examDeck.length > 0 && examIdx < examDeck.length && (
                <div className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-3">
                  <button onClick={() => answerExam(false)} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
                    Incorrecta ✖
                  </button>
                  <button onClick={() => answerExam(true)} className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
                    Correcta ✔
                  </button>
                </div>
              )}
              {mode === "Examen" && examDeck.length > 0 && examIdx >= examDeck.length && (
                <div className="mx-auto mt-6 max-w-3xl rounded-2xl border p-6 text-center dark:border-neutral-800">
                  <div className="text-lg font-semibold">Resultados del examen</div>
                  <div className="mt-1 text-2xl">{examScore.ok} / {examScore.total} aciertos</div>
                  <button onClick={startExam} className="mt-4 rounded-xl border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-800">
                    Repetir examen
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border p-8 text-center text-sm text-gray-600 dark:border-neutral-800 dark:text-gray-300">
              {mode === "Examen" ? "Inicia un examen para ver tarjetas aquí." : "No hay tarjetas para mostrar."}
            </div>
          )}
        </div>
      )}

      {/* Ayuda */}
      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border p-5 text-sm text-gray-600 dark:border-neutral-800 dark:text-gray-300">
        <div className="font-medium text-gray-800 dark:text-gray-100">Cómo usar este sitio</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Filtra por categoría/dificultad o busca por palabra clave.</li>
          <li>En <b>Estudio</b> verás todas; en <b>Aleatorio</b> una a la vez; en <b>Examen</b> responde 10.</li>
          <li>Marca tarjetas como <b>Aprendidas</b> para llevar tu progreso (se guarda en este navegador).</li>
          <li>Coloca imágenes en <code>/public/images</code> y referencia su ruta en la propiedad <code>imagen</code>.</li>
        </ul>
      </div>
    </main>
  );
}
