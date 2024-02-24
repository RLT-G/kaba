import React from 'react'
import s from './index.module.scss'
import Row from '../../Row'
import Col from '../../Col'
import Line from '../../Line'
import WhiteLabel from '../../WhiteLabel/index'
import {Collapse, ListItemButton} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import './index.css'

interface IStatisticDropDownMenuGraphPopUp {
	className?: string // Added className prop
}

const StatisticDropDownMenuGraphPopUp: React.FC<
	IStatisticDropDownMenuGraphPopUp
> = ({className}: IStatisticDropDownMenuGraphPopUp) => {
	const [openFinance, setopenFinance] = React.useState(false)
	const [openROI, setOpenROI] = React.useState(false)
	const [openProfit, setOpenProfit] = React.useState(false)
	const [openCTR, setOpenCTR] = React.useState(false)
	const [openAds, setOpenAds] = React.useState(false)
	const [openConversions, setOpenConversions] = React.useState(false)
	const [openConversionPercentage, setOpenConversionPercentage] =
		React.useState(false)
	const [openPrice, setOpenPrice] = React.useState(false)
	const handleClickFinance = () => {
		setopenFinance(!openFinance)
	}

	const handleClickROI = () => {
		setOpenROI(!openROI)
	}

	const handleClickProfit = () => {
		setOpenProfit(!openProfit)
	}

	const handleClickCTR = () => {
		setOpenCTR(!openCTR)
	}

	const handleClickAds = () => {
		setOpenAds(!openAds)
	}

	const handleClickConversions = () => {
		setOpenConversions(!openConversions)
	}

	const handleClickConversionPercentage = () => {
		setOpenConversionPercentage(!openConversionPercentage)
	}

	const handleClickPrice = () => {
		setOpenPrice(!openPrice)
	}
	return (
		<div className={s.wrapper + ' ' + className}>
			<Col width="250px" className={s.ColWrapper}>
				<WhiteLabel className={s.headerWhiteLabel} text="Расходы" />
				<Line width="280px" className={s.Line} />
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton className={s.buttonList} onClick={handleClickFinance}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Доходы" />
							{openFinance ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openFinance}
						timeout="auto"
						unmountOnExit>
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Конверсии" />
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel
								className={s.WhiteLabelInList}
								text="Конверсии % (CR)"
							/>
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Цена целисии" />
						</div>
						<Line width="280px" className={s.LineInList} />
					</Collapse>
				</Col>
				{/* ROI */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton className={s.buttonList} onClick={handleClickROI}>
						<Row className={s.RowButton} width="250px">
							<Row width="auto" className="flex items-center">
								<svg
									className="mr-[12px]"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<rect
										x="4"
										y="4"
										width="8"
										height="8"
										rx="4"
										fill="#4169E1"
									/>
								</svg>
								<WhiteLabel text="ROI" />
							</Row>
							{openROI ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openROI}
						timeout="auto"
						unmountOnExit>
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Конверсии" />
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel
								className={s.WhiteLabelInList}
								text="Конверсии % (CR)"
							/>
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Цена целисии" />
						</div>
						<Line width="280px" className={s.LineInList} />
					</Collapse>
				</Col>

				{/* Profit */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton className={s.buttonList} onClick={handleClickProfit}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Прибыль" />
							{openProfit ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openProfit}
						timeout="auto"
						unmountOnExit>
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Конверсии" />
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel
								className={s.WhiteLabelInList}
								text="Конверсии % (CR)"
							/>
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Цена целисии" />
						</div>
						<Line width="280px" className={s.LineInList} />
					</Collapse>
				</Col>

				{/* CTR */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton className={s.buttonList} onClick={handleClickCTR}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="CTR" />
							{openCTR ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openCTR}
						timeout="auto"
						unmountOnExit>
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Conversions" />
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel
								className={s.WhiteLabelInList}
								text="Conversions % (CR)"
							/>
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel
								className={s.WhiteLabelInList}
								text="Ad Impressions"
							/>
						</div>
						<Line width="280px" className={s.LineInList} />
						<div className={s.WhiteLabelInListDiv}>
							<WhiteLabel className={s.WhiteLabelInList} text="Price" />
						</div>
						<Line width="280px" className={s.LineInList} />
					</Collapse>
				</Col>

				{/* Ads */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton className={s.buttonList} onClick={handleClickAds}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Доля рекламных расходов" />
							{openAds ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openAds}
						timeout="auto"
						unmountOnExit>
						{/* Content */}
					</Collapse>
				</Col>

				{/* Conversions */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton
						className={s.buttonList}
						onClick={handleClickConversions}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Конверсии" />
							{openConversions ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openConversions}
						timeout="auto"
						unmountOnExit>
						{/* Content */}
					</Collapse>
				</Col>

				{/* Conversions Percentage */}
				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton
						className={s.buttonList}
						onClick={handleClickConversionPercentage}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Конверсии % (CR)" />
							{openConversionPercentage ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Line width="280px" className={s.Line} />

					<Collapse
						className={s.Collapse}
						in={openConversionPercentage}
						timeout="auto"
						unmountOnExit>
						{/* Content */}
					</Collapse>
				</Col>

				{/* Price */}

				<Col className={s.ListUndoDiv} width="250px">
					<ListItemButton
						className={s.buttonList}
						onClick={handleClickPrice}>
						<Row className={s.RowButton} width="250px">
							<WhiteLabel text="Цена цели" />
							{openPrice ? <ExpandLess /> : <ExpandMore />}
						</Row>
					</ListItemButton>

					<Collapse
						className={s.Collapse}
						in={openPrice}
						timeout="auto"
						unmountOnExit>
						{/* Content */}
					</Collapse>
				</Col>
			</Col>
		</div>
	)
}

export default StatisticDropDownMenuGraphPopUp
