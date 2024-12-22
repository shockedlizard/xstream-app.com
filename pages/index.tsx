import { Container, SimpleGrid, Text, Image, Center, Grid, Box, rem } from '@mantine/core'
import React from 'react'
import styles from './index.module.css'
import { PieChart } from '@mantine/charts'

const Index = () => {
  return (
    <div>
      <Banner />
      <Features />
      <HowToPlay />
      <InovativePlatform />
      <Tokenomics />
    </div>
  )
}

export default Index

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Container size="xl" className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <Image src="/images/xstream-logo.png" alt="Xstream" className={styles.bannerLogo} w={300} h="auto" />
          <Text className={styles.bannerSubtitle}>Solusi Cerdas Bisnis Online di Era 5.0</Text>
          <Text className={styles.bannerButton}>Mulai Investasi Anda Hari Ini!</Text>
        </div>
      </Container>
    </div>
  )
}


const Features = () => {
  const features = [
    {
      img: '/images/icon/flexibility.svg',
      title: 'Reward Harian',
      description: 'Dapatkan keuntungan harian melalui reward staking yang menarik. Anda memiliki fleksibilitas untuk membatalkan staking kapan saja.'
    },
    {
      img: '/images/icon/circular.svg',
      title: 'Fleksibilitas Staking',
      description: 'Nikmati kebebasan penuh dengan staking yang dapat dibatalkan kapan saja tanpa kontrak yang mengikat.'
    },
    {
      img: '/images/icon/arrow.svg',
      title: 'Potensi Kenaikan Harga Token',
      description: 'Raih keuntungan besar dari kenaikan nilai token saat listing di pasar DEX dan CEX.'
    },
    {
      img: '/images/icon/hand.svg',
      title: 'Program Afiliasi Eksklusif',
      description: 'Gabung sebagai bagian dari Xstream Army dan nikmati keuntungan dari program afiliasi kami.'
    }
  ];



  return (
    <div className={styles.features}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 2, md: 4 }}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <Center><Image src={feature.img} alt={feature.title} className={styles.featureIcon} /></Center>
              <Text className={styles.featureTitle}>{feature.title}</Text>
              <Text className={styles.featureDescription}>{feature.description}</Text>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  )
}

const HowToPlay = () => {
  return (
    <div className={styles.howToPlay}>
      <Container size="xl" className={styles.howToPlayContainer}>
        <Grid>
          <Grid.Col span={4}>
            <div className={styles.howToPlayImageContainer}>
              <Image src="/images/how-toplay.jpeg" alt="How to Play" className={styles.howToPlayImage} />
            </div>
          </Grid.Col>
          <Grid.Col span={8}>
            <div className={styles.howToPlayContent}>
              <Text className={styles.howToPlayTitle}>How it <span>works</span></Text>
              <Text className={styles.howToPlayDescription}>
                Memulai bisnis fisik seringkali membutuhkan biaya besar untuk inventaris, sewa, utilitas, hingga produk. Mengeluarkan modal besar sebelum bisnis berjalan adalah langkah yang berisiko. Oleh karena itu, bisnis ritel online menjadi solusi cerdas di era industri 5.0.</Text>

              <Text className={styles.howToPlayDescription}>Online shop kini menjadi tren bisnis yang terus berkembang pesat di Indonesia, menawarkan peluang tak terbatas di dunia digital. Dengan semakin banyaknya pengguna internet, potensi keuntungan dari bisnis online shop semakin besar. Namun, memulai dan mengelola bisnis ini tidak selalu mudah.</Text>

              <Text className={styles.howToPlayDescription}>Untuk menjawab tantangan tersebut, kami menghadirkan platform kemitraan berbasis kepemilikan aset digital. Platform ini menjembatani investor dengan bisnis ritel online secara praktis, tanpa repot. Kini, semua orang dapat menjalankan bisnis ritel online dengan mudah, aman, terjangkau, dan mendapatkan keuntungan yang berkelanjutan."
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}


const InovativePlatform = () => {
  return (
    <div className={styles.inovativePlatform}>
      <Container size="xl" className={styles.inovativePlatformContainer}>
        <Grid align="flex-end">
          <Grid.Col span={6}>
            <div className={styles.inovativePlatformContent}>
              <Text className={styles.inovativePlatformTitle}>XSTREAM</Text>
              <Text className={styles.inovativePlatformSubTitle}>INOVATIVE PLATFORM</Text>
              <Text className={styles.inovativePlatformDescription}>
                Platform kami adalah inovasi dalam bisnis ritel online yang memanfaatkan teknologi blockchain untuk meningkatkan efisiensi dan pendapatan. Dengan serangkaian prosedur yang terintegrasi, mulai dari persiapan, pemilihan produk, pelatihan host, penerapan software, hingga manajemen keuangan, kami memastikan pembagian keuntungan dilakukan secara proporsional dan transparan.
              </Text>
              <Text className={styles.inovativePlatformDescription}>Model bisnis ini dirancang untuk memastikan profitabilitas tinggi dan keberlanjutan. Kini, setiap orang memiliki peluang untuk mendapatkan penghasilan pasif secara konsisten dari bisnis ritel online.</Text>
              <Text className={styles.inovativePlatformDescription}>Keuntungan yang dihasilkan dari bisnis nyata ini dialokasikan secara strategis: sebagian untuk menopang likuiditas token di pasar, sebagian untuk memberikan insentif kepada pengguna, dan sebagian lagi untuk mendukung riset serta pengembangan demi mewujudkan tujuan yang lebih besar di masa depan.</Text>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className={styles.inovativePlatformImageContainer}>
              <Image src="/images/banner/vision.png" alt="How to Play" className={styles.inovativePlatformImage} />
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}


const Tokenomics = () => {

  const tokenomics = [
    {
      title: 'Token name: ',
      description: 'Xstream Token'
    },
    {
      title: 'Token symbol: ',
      description: 'XST'
    },
    {
      title: 'Total supply: ',
      description: '100.000.000.000 XTR'
    },
    {
      title: 'Token Network: ',
      description: 'BSC (BEP-20)'
    },
    {
      title: 'Token Decimal: ',
      description: '18'
    },
    {
      title: 'Emission Rate: ',
      description: 'Token will not be added'
    }

  ]

  const totalSupply = 100000000000;
  const data = [
    { name: 'Private sale', value: (15 / 100) * totalSupply, color: '#ff4d4d' }, // Merah terang
    { name: 'Public sale', value: (3 / 100) * totalSupply, color: '#ffae42' }, // Oranye terang
    { name: 'Ecosystem', value: (10 / 100) * totalSupply, color: '#39e09b' }, // Hijau neon
    { name: 'Marketing', value: (5 / 100) * totalSupply, color: '#2a9df4' }, // Biru terang
    { name: 'Reward', value: (50 / 100) * totalSupply, color: '#ffd700' }, // Emas
    { name: 'Partnership', value: (3 / 100) * totalSupply, color: '#b266ff' }, // Ungu terang
    { name: 'Developer', value: (4 / 100) * totalSupply, color: '#ff66b2' }, // Merah muda neon
    { name: 'Owner & Team', value: (10 / 100) * totalSupply, color: '#ffffff' }, // Putih
  ];


  return (
    <div className={styles.tokenomics}>
      <Container size="xl" className={styles.tokenomicsContainer}>
        <Grid align="flex-end">
          <Grid.Col span={6}>
            <Box className={styles.tokenomicsContent}>
              <SimpleGrid cols={2} verticalSpacing={rem(5)} spacing={rem(5)}>
                {tokenomics.map((item, index) => (
                  <div key={index} className={styles.tokenomicsItem}>
                    <Text className={styles.tokenomicsTitle}>{item.title}</Text>
                    <Text className={styles.tokenomicsDescription}>{item.description}</Text>
                  </div>
                ))}
              </SimpleGrid>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={styles.tokenomicsImageContainer}>
              <div className={styles.tokenomicsChartContainer}>
                <PieChart
                  size={300}
                  data={data}
                  withLabelsLine
                  labelsPosition="outside"
                  labelsType="percent"
                  withLabels
                  withTooltip
                  strokeWidth={2}
                />
              </div>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}