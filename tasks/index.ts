import { task } from 'hardhat/config'
import { deployAll } from './deployAll'
import { verifyAll } from './verifyAll'
import { flipUsingMatic } from './flipUsingMatic'
import { pauseAll } from './pauseAll'

task('verifyAll', 'verify all contracts', verifyAll)

task('deployAll', 'verify all contracts', deployAll)
