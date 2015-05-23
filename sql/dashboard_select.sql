DELIMITER ;;
DROP PROCEDURE IF EXISTS dashboard_select;;
CREATE PROCEDURE dashboard_select
(
    date_start    DATE,
    date_end      DATE
)
COMMENT 'Totals.'
BEGIN
    
    DECLARE expenses_amount_total DECIMAL(12, 2);
    SELECT sum(expense_amount)
      INTO expenses_amount_total
      FROM expenses
     WHERE cast(expense_time as DATE) BETWEEN DATE_START
                                          AND DATE_END;
    SELECT expenses_amount_total;
    
END;;
DELIMITER;
