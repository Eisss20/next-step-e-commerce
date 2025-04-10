CREATE OR REPLACE FUNCTION generate_product_id()
RETURNS TRIGGER AS $$
DECLARE
    first_letter VARCHAR(1);
    last_letter VARCHAR(1);
    year_code VARCHAR(2);
    random_code VARCHAR(4);
    short_color TEXT;
    new_id TEXT;
BEGIN
    IF (TG_OP = 'INSERT') THEN
        first_letter := LEFT(NEW.product_name, 1);
        last_letter := SUBSTRING(NEW.product_name FROM LENGTH(NEW.product_name) FOR 1);
        year_code := TO_CHAR(NOW(), 'YY');
        random_code := LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
        short_color := CASE
            WHEN LOWER(NEW.color_name) = 'red' THEN 'RD'
            WHEN LOWER(NEW.color_name) = 'blue' THEN 'BU'
            WHEN LOWER(NEW.color_name) = 'green' THEN 'GR'
            ELSE UPPER(LEFT(NEW.color_name, 2))
        END;
        new_id := CONCAT(UPPER(first_letter), UPPER(last_letter), year_code, random_code, '-', short_color);
        NEW.product_id := new_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_product_id
BEFORE INSERT ON product
FOR EACH ROW
EXECUTE FUNCTION generate_product_id();
